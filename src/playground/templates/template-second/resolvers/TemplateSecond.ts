import { fieldBuilder } from '@via-profit-services/core';
import { Resolvers, TemplateSecond } from '../types';

const templateSecondPage: Resolvers['TemplateSecond'] = fieldBuilder(
  ['id', 'page', 'h1', 'content'],
  field => (parent, _args, context) => {
    const { pageID } = parent;
    const { services } = context;

    const template: TemplateSecond = {
      id: 'TemplateSecond',
      page: { id: pageID },
      h1: `H1 of page ID ${pageID}`,
      content: services.pages.draftJsRawToGraphQL({
        blocks: [
          {
            key: '8ofc8',
            text: 'Second page',
            type: 'header-one',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
          {
            key: '3d15b',
            text: 'Контент страницы',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
        ],
        entityMap: {},
      }),
    };

    return template[field];
  },
);

export default templateSecondPage;

// const templateSecondPage = new Proxy<TemplateSecondResolver>(
//   {
//     id: () => ({}),
//     page: () => ({}),
//     appMenu: () => ({}),
//     h1: () => ({}),
//     content: () => ({}),
//   },
//   {
//     get: (_target, prop: keyof TemplateSecondResolver) => {
//       const resolver: TemplateSecondResolver[keyof TemplateSecondResolver] = async (
//         parent,
//         _args,
//         context,
//       ) => {
//         const { dataloader, services } = context;
//         const { pageID } = parent;
//         const page = await dataloader.pages.load(pageID);

//         if (!page) {
//           throw new BadRequestError(`Page ${page} not found`);
//         }

//         const template: TemplateSecond = {
//           id: 'TemplateSecond',
//           page: {
//             id: pageID,
//           },
//           appMenu: {
//             navigation: [],
//           },
//           h1: `H1 of page ID ${page.id}`,
//           content: services.pages.draftJsRawToGraphQL({
//             blocks: [
//               {
//                 key: '8ofc8',
//                 text: 'Second page',
//                 type: 'header-one',
//                 depth: 0,
//                 inlineStyleRanges: [],
//                 entityRanges: [],
//                 data: {},
//               },
//               {
//                 key: '3d15b',
//                 text: 'Контент страницы',
//                 type: 'unstyled',
//                 depth: 0,
//                 inlineStyleRanges: [],
//                 entityRanges: [],
//                 data: {},
//               },
//             ],
//             entityMap: {},
//           }),
//         };

//         return template[prop];
//       };

//       return resolver;
//     },
//   },
// );

// export default templateSecondPage;
