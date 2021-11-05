import { fieldBuilder } from '@via-profit-services/core';

import { Resolvers, TemplateFallback } from '../types';

const fallbackPageResolver: Resolvers['TemplateFallback'] = fieldBuilder(
  ['id', 'page'],
  field => (parent, _args, _context) => {
    const { pageID } = parent;

    const template: TemplateFallback = {
      id: 'TemplateFallback',
      page: { id: pageID },
    };

    return template[field];
  },
);

export default fallbackPageResolver;
