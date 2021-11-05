import { GraphQLFieldResolver } from 'graphql';
import { Context } from '@via-profit-services/core';
import type { Page } from '@via-profit-services/pages';

type Resolvers = {
  Query: {
    resolvePage: GraphQLFieldResolver<unknown, Context, { url: string }>;
  };
};

const pages: Page[] = [
  {
    id: '503a52b5-6c6b-44b7-b6e0-fbee3d4d6642',
    createdAt: new Date(),
    updatedAt: new Date(),
    url: '/',
    template: 'TemplateHome',
    availability: 'available',
    meta: {
      description: 'Home page description',
      title: 'Home page title',
      keywords: '',
    },
  },
  {
    id: '770f1b27-bf0a-4baf-940f-e8410d1a3cba',
    createdAt: new Date(),
    updatedAt: new Date(),
    url: '/contact',
    template: 'TemplateContact',
    availability: 'available',
    meta: {
      description: 'Contact page description',
      title: 'Contact page title',
      keywords: '',
    },
  },
  {
    id: 'a9b42a09-cc31-450e-b971-cbbc9f67eb9e',
    createdAt: new Date(),
    updatedAt: new Date(),
    url: '/about',
    template: 'TemplateSecond',
    availability: 'available',
    meta: {
      description: 'About page description',
      title: 'About page title',
      keywords: '',
    },
  },
  {
    id: '2647aadf-4340-4691-b1a1-fd6d68dac441',
    createdAt: new Date(),
    updatedAt: new Date(),
    url: '/404',
    template: 'TemplateFallback',
    availability: 'available',
    meta: {
      description: '404 description',
      title: '404 title',
      keywords: '',
    },
  },
];

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
