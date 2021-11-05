import type { MiddlewareFactory } from '@via-profit-services/pages';
import { Middleware } from '@via-profit-services/core';

import resolvers from './resolvers';
import typeDefs from './schema.graphql';
import PagesService from './services/PagesService';

const factory: MiddlewareFactory = configuration => {
  const { templates } = configuration;
  const unionPageTemplates: string[] = [templates.home, templates.fallback, ...templates.second];

  const middleware: Middleware = async ({ context, requestCounter }) => {
    if (requestCounter === 1) {
      context.services.pages = new PagesService({ context });
    }

    return {
      context,
    };
  };

  return {
    middleware,
    resolvers,
    typeDefs: `${typeDefs}
      enum PageTemplateName {${unionPageTemplates.join(' ')}}
      union PageTemplate = ${unionPageTemplates.join(' | ')}`,
  };
};

export default factory;
