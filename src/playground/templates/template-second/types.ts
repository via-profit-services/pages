import { Context } from '@via-profit-services/core';
import { GraphQLFieldResolver } from 'graphql';
import type { DraftJsContentState, PageTemplateNode } from '@via-profit-services/pages';

export type TemplateSecond = PageTemplateNode & {
  h1: string;
  content: DraftJsContentState;
};

export type Resolvers = {
  TemplateSecond: Record<
    keyof TemplateSecond,
    GraphQLFieldResolver<
      {
        pageID: string;
      },
      Context
    >
  >;
};
