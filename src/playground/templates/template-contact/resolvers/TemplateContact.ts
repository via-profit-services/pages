import { fieldBuilder } from '@via-profit-services/core';
import { Resolvers, TemplateContacts } from '../types';

const TemplateContact: Resolvers['TemplateContact'] = fieldBuilder(
  ['id', 'page', 'h1', 'address'],
  field => (parent, _args, _context) => {
    const { pageID } = parent;

    const template: TemplateContacts = {
      id: 'TemplateContact',
      page: { id: pageID },
      h1: `H1 of page ID ${pageID}`,
      address: 'Russia, Yekaterinbueg, Volhovskaya st. 20',
    };

    return template[field];
  },
);

// const __TemplateContact = new Proxy<TemplateContactResolver>(
//   {
//     id: () => ({}),
//     page: () => ({}),
//     appMenu: () => ({}),
//     h1: () => ({}),
//     address: () => ({}),
//   },
//   {
//     get: (_target, prop: keyof TemplateContactResolver) => {
//       const resolver: TemplateContactResolver[keyof TemplateContactResolver] = async (
//         parent,
//         _args,
//         context,
//       ) => {
//         const { dataloader } = context;
//         const { pageID } = parent;
//         const page = await dataloader.pages.load(pageID);

//         if (!page) {
//           throw new BadRequestError(`Page ${page} not found`);
//         }

//         const template: TemplateContacts = {
//           id: 'TemplateContact',
//           page: {
//             id: pageID,
//           },
//           appMenu: {
//             navigation: [
//               {
//                 id: '',
//                 label: 'dddd',
//                 url: 'dsdsd',
//                 parent: null,
//                 childs: null,
//               },
//             ],
//           },
//           h1: `H1 of page ID ${page.id}`,
//           address: 'Russia, Yekaterinbueg, Volhovskaya st. 20',
//         };

//         return template[prop];
//       };

//       return resolver;
//     },
//   },
// );

export default TemplateContact;
