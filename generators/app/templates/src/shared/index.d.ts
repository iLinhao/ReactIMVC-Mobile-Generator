import { BaseState } from 'react-imvc';
import * as sharedActions from './sharedActions';
import ZAPI from '../services';

/**
 * 共享 state
 */
export interface ISharedState {
  html?: {
    title?: string;
    description?: string;
    keywords?: string;
  };
}
export type TSharedBaseState = ISharedState & BaseState;

/**
 * 共享 actions
 */
export type TSharedActions = typeof sharedActions;

/**
 * 导出的 BaseController
 */
export type { default as TSharedCtrl } from './BaseController';

/**
 * 通用接口参数
 */
export interface IApiRequest {
  [key: string]: any;
}

/**
 * 通用接口返回
 */
export interface IApiResponse {
  code?: number;
  message?: string;
  result?: any;
}
