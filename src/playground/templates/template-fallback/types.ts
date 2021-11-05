import { Context } from '@via-profit-services/core';
import type { PageTemplateNode } from '@via-profit-services/pages';
import { GraphQLFieldResolver } from 'graphql';

export type TemplateFallback = PageTemplateNode;

export type Resolvers = {
  TemplateFallback: Record<
    keyof TemplateFallback,
    GraphQLFieldResolver<
      {
        pageID: string;
      },
      Context
    >
  >;
};
