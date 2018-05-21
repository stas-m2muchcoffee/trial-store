import * as customersRequestsActions from '../actions';
import { ICustomersRequestsState, customersInitialState } from '../states';

export function customersRequestsReducer (
  state: ICustomersRequestsState = customersInitialState,
  { type, payload }: customersRequestsActions.CustomersActions,
) {
  switch (type) {
    case customersRequestsActions.CustomersActionTypes.REQUEST: {
      return {
        ...state,
        loading: true,
        loaded: false,
        status: '',
        data: null,
      };
    }

    case customersRequestsActions.CustomersActionTypes.REQUEST_SUCCESS:
    case customersRequestsActions.CustomersActionTypes.REQUEST_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: true,
        status: 'success',
        data: payload,
      };
    }

    default: {
      return state;
    }
  }
}
