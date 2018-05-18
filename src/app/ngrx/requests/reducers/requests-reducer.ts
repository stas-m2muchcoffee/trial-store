import { IRequestsState, requestsInitialState } from '../states';

import { productsRequestsReducer } from '../nested-states/products/reducers';

export function requestsReducer(
  state = requestsInitialState,
  action
): IRequestsState {
  return {
    productsRequestsState: productsRequestsReducer(state.productsRequestsState, action)
  };
}
