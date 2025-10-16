import type { AspidaClient } from 'aspida';
import type { Methods as Methods_l46m7e } from './allergies';
import type { Methods as Methods_143agno } from './conditions';
import type { Methods as Methods_1kapsts } from './profile/_userId@string';
import type { Methods as Methods_2p3n4v } from './profile/_userId@string/allergies';
import type { Methods as Methods_ebw7cv } from './profile/_userId@string/conditions';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? 'http://localhost:4000' : baseURL).replace(/\/$/, '');
  const PATH0 = '/allergies';
  const PATH1 = '/conditions';
  const PATH2 = '/profile';
  const GET = 'GET';
  const PATCH = 'PATCH';

  return {
    allergies: {
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_l46m7e['get']['resBody']>(prefix, PATH0, GET, option).json(),
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_l46m7e['get']['resBody']>(prefix, PATH0, GET, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH0}`,
    },
    conditions: {
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_143agno['get']['resBody']>(prefix, PATH1, GET, option).json(),
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_143agno['get']['resBody']>(prefix, PATH1, GET, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH1}`,
    },
    profile: {
      _userId: (val1: string) => {
        const prefix1 = `${PATH2}/${val1}`;

        return {
          allergies: {
            patch: (option: { body: Methods_2p3n4v['patch']['reqBody'], config?: T | undefined }) =>
              fetch<Methods_2p3n4v['patch']['resBody']>(prefix, `${prefix1}${PATH0}`, PATCH, option).json(),
            $patch: (option: { body: Methods_2p3n4v['patch']['reqBody'], config?: T | undefined }) =>
              fetch<Methods_2p3n4v['patch']['resBody']>(prefix, `${prefix1}${PATH0}`, PATCH, option).json().then(r => r.body),
            $path: () => `${prefix}${prefix1}${PATH0}`,
          },
          conditions: {
            patch: (option: { body: Methods_ebw7cv['patch']['reqBody'], config?: T | undefined }) =>
              fetch<Methods_ebw7cv['patch']['resBody']>(prefix, `${prefix1}${PATH1}`, PATCH, option).json(),
            $patch: (option: { body: Methods_ebw7cv['patch']['reqBody'], config?: T | undefined }) =>
              fetch<Methods_ebw7cv['patch']['resBody']>(prefix, `${prefix1}${PATH1}`, PATCH, option).json().then(r => r.body),
            $path: () => `${prefix}${prefix1}${PATH1}`,
          },
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_1kapsts['get']['resBody']>(prefix, prefix1, GET, option).json(),
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_1kapsts['get']['resBody']>(prefix, prefix1, GET, option).json().then(r => r.body),
          patch: (option: { body: Methods_1kapsts['patch']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_1kapsts['patch']['resBody']>(prefix, prefix1, PATCH, option).json(),
          $patch: (option: { body: Methods_1kapsts['patch']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_1kapsts['patch']['resBody']>(prefix, prefix1, PATCH, option).json().then(r => r.body),
          $path: () => `${prefix}${prefix1}`,
        };
      },
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
