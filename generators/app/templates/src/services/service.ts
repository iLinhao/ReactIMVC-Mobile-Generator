import { FetchOptions } from 'react-imvc';

// 统一错误信息提示, 统一容错抛错处理，post / put 方法底层调用的是 fetch 方法
export const fetch = async (url: string, options: FetchOptions, ctrl: any) => {
  const { method = '', headers } = options;
  const contentType = ['POST', 'PUT'].includes(method) ? 'application/json' : 'application/x-www-form-urlencoded';
  const _options = {
      ...options,
      // credentials: 'include' as RequestCredentials,  TODO 待处理
      // timeout: 3000,
      headers: {
      ...headers,
      'Content-Type': contentType,
      'z-platform': 'H5',

      },
  } as any;
  const token = ctrl.cookie('Authorization');
  if (token) {
      _options.headers = {
      ..._options.headers,
      Authorization: token,
      };
  }
  const data = await ctrl.super.fetch(url, _options);
  return data;
};