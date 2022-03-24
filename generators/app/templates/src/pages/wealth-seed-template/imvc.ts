// react imvc base state and ctrl hook

import { useModelState as _useModelState, useCtrl as _useCtrl} from "react-imvc/hook";
import { IState, TCtrl } from "./index";

export function useModelState() {
  return _useModelState<IState>();
}

export function useCtrl() {
  return _useCtrl<TCtrl>();
}
