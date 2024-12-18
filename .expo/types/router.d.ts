/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/user-view`; params?: Router.UnknownInputParams; } | { pathname: `/../entity/ponto-entity`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/colaborador/colaborador-view`; params?: Router.UnknownInputParams; } | { pathname: `/funcao/funcao-view`; params?: Router.UnknownInputParams; } | { pathname: `/ponto/ponto-form-view`; params?: Router.UnknownInputParams; } | { pathname: `/ponto/ponto-view`; params?: Router.UnknownInputParams; } | { pathname: `/colaborador/edition/[id]`, params: Router.UnknownInputParams & { id: string | number; } } | { pathname: `/colaborador/visualization/[id]`, params: Router.UnknownInputParams & { id: string | number; } } | { pathname: `/details/[id]`, params: Router.UnknownInputParams & { id: string | number; } } | { pathname: `/funcao/[id]`, params: Router.UnknownInputParams & { id: string | number; } };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/user-view`; params?: Router.UnknownOutputParams; } | { pathname: `/../entity/ponto-entity`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `/colaborador/colaborador-view`; params?: Router.UnknownOutputParams; } | { pathname: `/funcao/funcao-view`; params?: Router.UnknownOutputParams; } | { pathname: `/ponto/ponto-form-view`; params?: Router.UnknownOutputParams; } | { pathname: `/ponto/ponto-view`; params?: Router.UnknownOutputParams; } | { pathname: `/colaborador/edition/[id]`, params: Router.UnknownOutputParams & { id: string; } } | { pathname: `/colaborador/visualization/[id]`, params: Router.UnknownOutputParams & { id: string; } } | { pathname: `/details/[id]`, params: Router.UnknownOutputParams & { id: string; } } | { pathname: `/funcao/[id]`, params: Router.UnknownOutputParams & { id: string; } };
      href: Router.RelativePathString | Router.ExternalPathString | `/${`?${string}` | `#${string}` | ''}` | `/user-view${`?${string}` | `#${string}` | ''}` | `/../entity/ponto-entity${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | `/colaborador/colaborador-view${`?${string}` | `#${string}` | ''}` | `/funcao/funcao-view${`?${string}` | `#${string}` | ''}` | `/ponto/ponto-form-view${`?${string}` | `#${string}` | ''}` | `/ponto/ponto-view${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/user-view`; params?: Router.UnknownInputParams; } | { pathname: `/../entity/ponto-entity`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/colaborador/colaborador-view`; params?: Router.UnknownInputParams; } | { pathname: `/funcao/funcao-view`; params?: Router.UnknownInputParams; } | { pathname: `/ponto/ponto-form-view`; params?: Router.UnknownInputParams; } | { pathname: `/ponto/ponto-view`; params?: Router.UnknownInputParams; } | `/colaborador/edition/${Router.SingleRoutePart<T>}` | `/colaborador/visualization/${Router.SingleRoutePart<T>}` | `/details/${Router.SingleRoutePart<T>}` | `/funcao/${Router.SingleRoutePart<T>}` | { pathname: `/colaborador/edition/[id]`, params: Router.UnknownInputParams & { id: string | number; } } | { pathname: `/colaborador/visualization/[id]`, params: Router.UnknownInputParams & { id: string | number; } } | { pathname: `/details/[id]`, params: Router.UnknownInputParams & { id: string | number; } } | { pathname: `/funcao/[id]`, params: Router.UnknownInputParams & { id: string | number; } };
    }
  }
}
