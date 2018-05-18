import { IRequestsState, requestsInitialState } from '../states';

import {
  productsRequestsReducer,
} from './index';

export function requestsReducer(
  state = requestsInitialState,
  action
): IRequestsState {
  return {
    productsRequestsState: productsRequestsReducer(state.productsRequestsState, action)
  };
}
