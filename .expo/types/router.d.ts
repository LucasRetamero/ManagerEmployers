/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/user-view`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/colaborador/calorador-form-view`; params?: Router.UnknownInputParams; } | { pathname: `/colaborador/colaborador-view`; params?: Router.UnknownInputParams; } | { pathname: `/details/[id]`, params: Router.UnknownInputParams & { id: string | number; } };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/user-view`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `/colaborador/calorador-form-view`; params?: Router.UnknownOutputParams; } | { pathname: `/colaborador/colaborador-view`; params?: Router.UnknownOutputParams; } | { pathname: `/details/[id]`, params: Router.UnknownOutputParams & { id: string; } };
      href: Router.RelativePathString | Router.ExternalPathString | `/${`?${string}` | `#${string}` | ''}` | `/user-view${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | `/colaborador/calorador-form-view${`?${string}` | `#${string}` | ''}` | `/colaborador/colaborador-view${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/user-view`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/colaborador/calorador-form-view`; params?: Router.UnknownInputParams; } | { pathname: `/colaborador/colaborador-view`; params?: Router.UnknownInputParams; } | `/details/${Router.SingleRoutePart<T>}` | { pathname: `/details/[id]`, params: Router.UnknownInputParams & { id: string | number; } };
    }
  }
}
