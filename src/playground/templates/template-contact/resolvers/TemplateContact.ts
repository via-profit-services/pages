import { fieldBuilder } from '@via-profit-services/core';

import { Resolvers, TemplateContacts } from '../types';
import { contentBlocks } from '../../../content';

const TemplateContact: Resolvers['TemplateContact'] = fieldBuilder(
  ['id', 'page', 'h1', 'content'],
  field => (parent, _args, context) => {
    const { services } = context;
    const { pageID } = parent;

    const pageBlocks = contentBlocks.filter(
      block => block.template === 'TemplateContact' && block.page === pageID,
    );

    const blocks = services.pages.contentBlocksArrayToObject(pageBlocks, [
      'h1',
      'slider',
      'content',
    ]);

    const template: TemplateContacts = {
      id: 'TemplateContact',
      page: { id: pageID },
      h1: String(blocks.h1),
      content: services.pages.draftJsRawToGraphQL(blocks.content ? (blocks.content as any) : null),
    };

    return template[field];
  },
);

export default TemplateContact;
