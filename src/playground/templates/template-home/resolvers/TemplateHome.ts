import { fieldBuilder } from '@via-profit-services/core';
import type { Resolvers, TemplateHome } from '../types';

import { contentBlocks } from '../../../content';

const homePageResolver: Resolvers['TemplateHome'] = fieldBuilder(
  ['id', 'page', 'h1', 'content', 'slider'],
  field => (parent, _args, context) => {
    const { pageID } = parent;
    const { services } = context;

    const pageBlocks = contentBlocks.filter(
      block => block.template === 'TemplateHome' && block.page === pageID,
    );
    const blocks = services.pages.contentBlocksArrayToObject(pageBlocks, [
      'h1',
      'slider',
      'content',
    ]);

    const template: TemplateHome = {
      id: 'TemplateHome',
      page: { id: pageID },
      h1: String(blocks.h1),
      slider: blocks.slider ? (blocks.slider as any) : null,
      content: services.pages.draftJsRawToGraphQL(blocks.content ? (blocks.content as any) : null),
    };

    return template[field];
  },
);

export default homePageResolver;
