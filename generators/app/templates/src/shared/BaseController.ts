// base controller class
import { Actions, FetchOptions, Preload } from 'react-imvc';
import Controller from 'react-imvc/controller';
import querystring from 'querystring';
import sharedInitialState from './sharedInitialState';
import * as sharedActions from './sharedActions';
import { TSharedBaseState, TSharedActions, IApiRequest } from './index';
import API from '../services';
import moment from 'moment';

export default class BaseController<S extends TSharedBaseState, AS extends Actions<S>> extends Controller<
  S,
  AS & TSharedActions
> {
  // 添加 mian.css
  preload: Preload = {
    main: '/assets/css/main.css',
    antdmobile: '/assets/css/antdmobile.css',
  };

  // API
  $API = API;
  pageId = '';

  // 合并共享 state
  async getInitialState(initialState: S) {
    const enterTime = moment().valueOf();
    return {
      ...sharedInitialState,
      ...initialState,
      enterTime,
      nativeStatusBarHeight: 0
    };
  }

  // 动态合并共享的 actions
  getFinalActions(actions: AS) {
    return {
      ...actions,
      ...sharedActions,
    };
  }

  // 封装 get 方法，处理 node 跨域要求
  get = (api: string, params?: IApiRequest) => {
    const _options = {
      method: 'GET',
    };
    let newApi = api;
    if (params) {
      const prefix = newApi.includes('?') ? '&' : '?';
      newApi += prefix + querystring.stringify(params);
    }
    return this.fetch(newApi, _options);
  };

  // 封装 post 方法，处理 node 跨域要求
  post = (api: string, params?: IApiRequest) => {
    const _options = {
      method: 'POST',
      body: JSON.stringify(params),
    };
    return this.fetch(api, _options);
  };  

  // 统一错误信息提示, 统一容错抛错处理，post / put 方法底层调用的是 fetch 方法
  fetch = async (url: string, options: FetchOptions) => {
    const { method = '', headers } = options;
    const contentType = ['POST', 'PUT'].includes(method) ? 'application/json' : 'application/x-www-form-urlencoded';
    const _options = {
      ...options,
      headers: {
        ...headers,
        'Content-Type': contentType,
        'platform': 'H5',
      },
    } as any;

    const data = await super.fetch(url, _options);
    return data;
  };
}
