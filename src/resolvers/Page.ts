import { fieldBuilder } from '@via-profit-services/core';
import { Resolvers } from '@via-profit-services/pages';

const page: Resolvers['Page'] = fieldBuilder(
  ['id', 'url', 'createdAt', 'updatedAt', 'availability', 'template', 'meta'],
  field => (parent, _args, _context) => {
    if (field === 'template') {
      const { id, template } = parent;

      return {
        __typename: template,
        pageID: id,
      };
    }

    return parent[field];
  },
);

export default page;
