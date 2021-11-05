import { Context } from '@via-profit-services/core';
import { DraftJsContentState, PageTemplateNode } from '@via-profit-services/pages';
import { GraphQLFieldResolver } from 'graphql';

export type HomeSlider = {
  slides: Array<{
    id: string;
    image: string;
  }>;
  settings: {
    autoplay: boolean;
    delay: number;
  };
};

export type TemplateHome = PageTemplateNode & {
  h1: string;
  slider: HomeSlider;
  content: DraftJsContentState;
};

export type Resolvers = {
  TemplateHome: Record<
    keyof TemplateHome,
    GraphQLFieldResolver<
      {
        pageID: string;
      },
      Context
    >
  >;
};
