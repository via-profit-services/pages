declare module '@via-profit-services/pages' {
  import { Middleware, Context } from '@via-profit-services/core';
  import { GraphQLFieldResolver } from 'graphql';

  export type JSONValue =
    | string
    | number
    | boolean
    | null
    | JSONValue[]
    | { [key: string]: JSONValue };
  export interface DraftJsContentState {
    blocks: DraftJsContentBlock[];
    entityMap: Record<string, DraftJsEntity>;
  }
  export type TemplateType = 'home' | 'fallback' | 'second';

  export type DraftJsBlockType =
    | 'unstyled'
    | 'paragraph'
    | 'header-one'
    | 'header-two'
    | 'header-three'
    | 'header-four'
    | 'header-five'
    | 'header-six'
    | 'unordered-list-item'
    | 'ordered-list-item'
    | 'blockquote'
    | 'code-block'
    | 'atomic';

  export type DraftJsEntityType = 'LINK' | 'TOKEN' | 'PHOTO' | 'IMAGE';
  export type DraftJsEntityMutability = 'MUTABLE' | 'IMMUTABLE' | 'SEGMENTED';
  export type DraftJsInlineStyleType = 'BOLD' | 'CODE' | 'ITALIC' | 'STRIKETHROUGH' | 'UNDERLINE';

  export interface DraftJsEntity<T = Record<string, any>> {
    type: DraftJsEntityType | string;
    mutability: DraftJsEntityMutability;
    data: T;
  }

  export interface DraftJsInlineStyleRange {
    style: DraftJsInlineStyleType;
    offset: number;
    length: number;
  }

  export interface DraftJsContentBlock {
    key: string;
    type: DraftJsBlockType | string;
    text: string;
    depth: number;
    inlineStyleRanges: DraftJsInlineStyleRange[];
    entityRanges: DraftJsEntityRange[];
    data?: Record<string, any>;
  }

  export interface DraftJsEntityRange {
    key: number;
    offset: number;
    length: number;
  }

  export type MiddlewareConfig = {
    templates: TemplatesMap;
  };

  export type TemplatesMap = {
    home: string;
    fallback: string;
    second: string[];
  };

  export type UrlToPageID = {
    id: string;
    page: {
      id: string;
    };
  };

  export type MiddlewareFactory = (config: MiddlewareConfig) => {
    middleware: Middleware;
    resolvers: Resolvers;
    typeDefs: string;
  };

  export type Resolvers = {
    Page: Record<keyof Page, GraphQLFieldResolver<Page, Context>>;
  };

  export type PageAvailability = 'available' | 'unavailable';

  export interface Page {
    id: string;
    url: string;
    createdAt: Date;
    updatedAt: Date;
    availability: PageAvailability;
    template: string;
    meta: {
      title: string;
      description: string;
      keywords: string;
    };
  }

  export interface ContentBlock {
    id: string;
    name: string;
    page: string;
    template: string;
    createdAt: Date;
    updatedAt: Date;
    content: JSONValue;
  }

  export type PageResolver = Record<
    | 'id'
    | 'url'
    | 'createdAt'
    | 'updatedAt'
    | 'availability'
    | 'contentSecurityPolicy'
    | 'template'
    | 'meta',
    GraphQLFieldResolver<{ id: string }, Context>
  >;

  export type ContentBlockResolver = Record<
    'id' | 'name' | 'page' | 'template' | 'createdAt' | 'updatedAt' | 'content',
    GraphQLFieldResolver<{ id: string }, Context>
  >;

  export type AppBarMenuResolver = Record<keyof AppBarMenu, GraphQLFieldResolver<unknown, Context>>;
  export type AppBarMenuNavLinkResolver = Record<
    keyof AppBarMenuNavLink,
    GraphQLFieldResolver<unknown, Context>
  >;

  export interface AppBarMenuNavLink {
    id: string;
    url: string;
    parent: AppBarMenuNavLink | null;
    childs: AppBarMenuNavLink[] | null;
    label: string;
  }

  export interface AppBarMenu {
    navigation: AppBarMenuNavLink[];
  }

  export interface PageTemplateNode {
    id: string;
    page: { id: string };
    // appMenu: AppBarMenu;
  }

  export type ContentSecurityPolicyMap = Record<
    | 'defaultSrc'
    | 'styleSrc'
    | 'fontSrc'
    | 'scriptSrcElem'
    | 'scriptSrc'
    | 'imgSrc'
    | 'connectSrc'
    | 'frameSrc'
    | 'childSrc',
    string
  >;

  export type PagesTableModel = {
    readonly id: string;
    readonly url: string;
    readonly createdAt: string;
    readonly updatedAt: string;
    readonly availability: PageAvailability;
    readonly template: string;
  };

  export type PagesTableModelResponse = {
    readonly id: string;
    readonly url: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly availability: PageAvailability;
    readonly template: string;
  };

  export type PagesMetaTableModel = {
    readonly page: string;
    readonly createdAt: string;
    readonly updatedAt: string;
    readonly title: string | null;
    readonly description: string | null;
    readonly keywords: string | null;
  };

  export type PagesMetaTableModelResponse = {
    readonly page: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly title: string | null;
    readonly description: string | null;
    readonly keywords: string | null;
  };

  export type PagesContentBlockTable = {
    readonly id: string;
    readonly name: string;
    readonly page: string;
    readonly template: string;
    readonly createdAt: string;
    readonly updatedAt: string;
    readonly content: string;
  };

  export type PagesContentBlockTableResponse = {
    readonly id: string;
    readonly name: string;
    readonly page: string;
    readonly template: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly content: JSONValue;
  };

  export type PagesTemplateTable = {
    readonly id: string;
    readonly type: TemplateType;
    readonly createdAt: string;
    readonly updatedAt: string;
  };

  export interface CreateContentBlockProps {
    id: string;
    name: string;
    page: string;
    template: string;
    content: string;
  }

  export interface UpdateContentBlockProps {
    template?: string;
    name?: string;
    page?: string;
    content?: string;
  }

  export interface PagesServiceProps {
    context: Context;
  }

  export type ContentBlocksByPageTemplateProps = {
    pageID: string;
    templateName: string;
    limit?: number;
  };

  export type ContentBlockPseudos = {
    id: string;
    contentBlocks: ContentBlock[];
  };

  export class PagesService {
    constructor(props: PagesServiceProps);
    public draftJsRawToGraphQL(draftJsRaw: DraftJsContentState | null): DraftJsContentState;
    public contentBlocksArrayToObject<K extends string>(
      blocks: ContentBlock[],
      keys: K[],
    ): Record<K, JSONValue | undefined>;
  }

  export const PAGE_MAIN_URL: string;
  export const PAGE_FALLBACK_URL: string;
  export const LOG_FILENAME_PAGES: string;
}
