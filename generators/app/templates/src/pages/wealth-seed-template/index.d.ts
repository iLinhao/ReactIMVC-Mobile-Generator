import { BaseState } from 'react-imvc';
import * as Model from './Model';
import { ISharedState, TSharedActions } from '@/shared/index';

export type { default as TCtrl } from './Controller';

export type TActions = Omit<typeof Model, 'initialState'>;

export interface IState extends BaseState, IInitState {}

export interface IInitState extends ISharedState {
  text?: string;
}
