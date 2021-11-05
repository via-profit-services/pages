import { makeExecutableSchema } from '@graphql-tools/schema';
import { factory, resolvers, typeDefs } from '@via-profit-services/core';
import * as redis from '@via-profit-services/redis';
import express from 'express';
import http from 'http';

import { factory as pagesFactory } from '../index';
import * as templates from './templates';
import * as custom from './schema';

(async () => {
  const app = express();
  const server = http.createServer(app);

  const redisConfig: redis.Options = {
    host: 'localhost',
    port: 6379,
    password: '',
    db: 0,
  };

  const redisMiddleware = redis.factory(redisConfig);
  const pages = pagesFactory({
    templates: {
      home: 'TemplateHome',
      fallback: 'TemplateFallback',
      second: ['TemplateSecond', 'TemplateContact'],
    },
  });

  /*
  const permissionsMiddleware = permissions.factory({
    enableIntrospection: process.env.ENABLE_INTROSPECTION === 'true',
    permissions: {
      'Query.*': permissions.or([isAdministrator, isDeveloper]),
      'Mutation.*': permissions.or([isAdministrator, isDeveloper]),
      'Query.core': permissions.allow(),
      'Query.version': permissions.allow(),
      'Query.pages': permissions.allow(),
      'PagesQuery.*': permissions.or([isAdministrator, isDeveloper]),
      'PagesQuery.resolvePage': permissions.allow(),
      'PagesQuery.page': permissions.or([isAdministrator, isDeveloper]),
      'Mutation.authentification': permissions.allow(),
    },
  });
  */

  const schema = makeExecutableSchema({
    typeDefs: [typeDefs, pages.typeDefs, templates.typeDefs, custom.typeDefs],
    resolvers: [resolvers, pages.resolvers, templates.resolvers, custom.resolvers],
  });

  // const enableIntrospection = false;
  const { graphQLExpress } = await factory({
    server,
    schema,
    debug: true,
    middleware: [redisMiddleware, pages.middleware],
  });

  app.use('/graphql', graphQLExpress); // <-- Last

  server.listen(9000, () => {
    console.log(`GraphQL Server started at http://localhost:9000/graphql`);
  });
})();
