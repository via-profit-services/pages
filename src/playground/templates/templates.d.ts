declare module 'templates' {
  import { Middleware } from '@via-profit-services/core';

  export type MiddlewareFactory = () => Middleware;
}