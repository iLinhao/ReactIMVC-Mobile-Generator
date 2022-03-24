/**
 * shared initial actions
 */
import { Action, BaseState } from 'react-imvc';
import { ISharedState } from './index';

export const UPDATE_HTML_TITLE: Action<ISharedState & BaseState, string> = (state, title) => {
  let html = {
    ...state.html,
    title,
  };
  return {
    ...state,
    html,
  };
};
