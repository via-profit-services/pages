declare module '@via-profit-services/core' {
  import { PagesService, Page } from '@via-profit-services/pages';

  interface CoreEmitter {
    on(event: 'pages-was-updated', callback: (pages: Page[]) => void): this;
    on(event: 'pages-was-created', callback: (pages: Page[]) => void): this;
    on(event: 'pages-was-deleted', callback: (ids: string[]) => void): this;

    once(event: 'pages-was-updated', callback: (pages: Page[]) => void): this;
    once(event: 'pages-was-created', callback: (pages: Page[]) => void): this;
    once(event: 'pages-was-deleted', callback: (ids: string[]) => void): this;
  }

  interface ServicesCollection {
    pages: PagesService;
  }
}
