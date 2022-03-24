// react imvc base state and ctrl hook

import { useModelState as _useModelState, useCtrl as _useCtrl } from 'react-imvc/hook';
import { BaseState } from 'react-imvc';
import { ISharedState, TSharedCtrl, TSharedActions } from './index';

export function useModelState() {
  return _useModelState<ISharedState & BaseState>();
}

export function useCtrl() {
  return _useCtrl<TSharedCtrl<ISharedState & BaseState, TSharedActions>>();
}
