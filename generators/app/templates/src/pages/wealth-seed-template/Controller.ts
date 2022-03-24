// 模板代码 Controller

import View from './View';
import * as Model from './Model';
import { IState, TActions } from './index';
import Controller from '@/shared/BaseController';

export default class WealthSeedTemplate extends Controller<IState, TActions> {
  SSR = false;
  View = View;
  Model = Model;

  componentDidMount() {
  }
}
