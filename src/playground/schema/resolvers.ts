import { GraphQLFieldResolver } from 'graphql';
import { Context } from '@via-profit-services/core';

import { pages } from '../content';

type Resolvers = {
  Query: {
    resolvePage: GraphQLFieldResolver<unknown, Context, { url: string }>;
  };
};

const resolvers: Resolvers = {
  Query: {
    resolvePage: async (_parent, args, _context) => {
      const { url } = args;
      const page = pages.find(p => p.url === url);

      if (!page) {
        const fallback = pages.find(p => p.url === '/404');
        if (!fallback) {
          throw new Error(
            `Fallback page with «/404» not found. You must create fallback page for right response`,
          );
        }

        return fallback;
      }

      return page;
    },
  },
};

export default resolvers;
