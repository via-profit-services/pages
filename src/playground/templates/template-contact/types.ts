import { Context } from '@via-profit-services/core';
import { PageTemplateNode, DraftJsContentState } from '@via-profit-services/pages';
import { GraphQLFieldResolver } from 'graphql';

export type TemplateContacts = PageTemplateNode & {
  h1: string;
  content: DraftJsContentState;
};

export type Resolvers = {
  TemplateContact: Record<
    keyof TemplateContacts,
    GraphQLFieldResolver<
      {
        pageID: string;
      },
      Context
    >
  >;
};
