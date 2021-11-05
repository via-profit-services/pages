import { Context } from '@via-profit-services/core';
import { PageTemplateNode } from '@via-profit-services/pages';
import { GraphQLFieldResolver } from 'graphql';

export type TemplateContacts = PageTemplateNode & {
  h1: string;
  address: string;
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
