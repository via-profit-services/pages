import * as home from './template-home';
import * as second from './template-second';
import * as contact from './template-contact';
import * as fallback from './template-fallback';

const typeDefs = `
  ${home.typeDefs}
  ${second.typeDefs}
  ${contact.typeDefs}
  ${fallback.typeDefs}
`;

const resolvers = {
  ...home.resolvers,
  ...second.resolvers,
  ...contact.resolvers,
  ...fallback.resolvers,
};

export { typeDefs, resolvers };
