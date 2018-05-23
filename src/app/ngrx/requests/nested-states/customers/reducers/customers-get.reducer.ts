import * as customersRequestsActions from '../actions';
import { ICustomersState, customersInitialState } from '../states';

export function customersReducer (
  state: ICustomersState = customersInitialState,
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
