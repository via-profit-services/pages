import { fieldBuilder } from '@via-profit-services/core';
import type { Resolvers, TemplateHome } from '../types';

const homePageResolver: Resolvers['TemplateHome'] = fieldBuilder(
  ['id', 'page', 'h1', 'content', 'slider'],
  field => (parent, _args, context) => {
    const { pageID } = parent;
    const { services } = context;

    const template: TemplateHome = {
      id: 'TemplateHome',
      page: { id: pageID },
      h1: 'Home <h1>',
      slider: {
        slides: [],
        settings: {
          autoplay: true,
          delay: 3000,
        },
      },
      content: services.pages.draftJsRawToGraphQL({
        entityMap: {},
        blocks: [],
      }),
    };

    return template[field];
  },
);

export default homePageResolver;

// const templateHomePage = new Proxy<TemplateHomeResolver>(
//   {
//     id: () => ({}),
//     page: () => ({}),
//     h1: () => ({}),
//     content: () => ({}),
//     slider: () => ({}),
//   },
//   {
//     get: (_target, prop: keyof TemplateHomeResolver) => {
//       const resolver: TemplateHomeResolver[keyof TemplateHomeResolver] = async (
//         parent,
//         _args,
//         context,
//       ) => {
//         const { services, dataloader } = context;
//         const { pageID } = parent;
//         const page = await dataloader.pages.load(pageID);

//         if (!page) {
//           throw new BadRequestError(`Page ${page} not found`);
//         }

//         const { contentBlocks } = await dataloader.templatesBlocks.load(
//           `${page.id}.${TEMPLATE_ID}`,
//         );

//         const content = services.pages.contentBlocksArrayToObject(contentBlocks, [
//           'h1',
//           'slider',
//           'content',
//         ]);

//         const template: TemplateHome = {
//           id: TEMPLATE_ID,
//           page: {
//             id: pageID,
//           },
//           appMenu: {
//             navigation: [],
//           },
//           h1: String(content.h1),
//           slider: content.slider as TemplateHome['slider'],
//           content: services.pages.draftJsRawToGraphQL(content.content as any),
//         };

//         return template[prop];
//       };

//       return resolver;
//     },
//   },
// );

// export default templateHomePage;
