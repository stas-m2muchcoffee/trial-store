import * as CustomersActions from '../actions/customers-actions';
import { ICustomersState, initialState } from '../states';

export function customersReducer(
  state: ICustomersState = initialState,
  {type, payload}: CustomersActions.Actions,
): ICustomersState {
  switch (type) {
    case CustomersActions.ActionTypes.GET_LIST_SUCCESSFUL: {
      const entities = payload.reduce((accEntities, currentCustomer) =>
          ({...accEntities, [currentCustomer.id]: currentCustomer}),
        {}
      );
      const collectionIds = payload.map(customer => customer.id);
      return {
        ...state,
        entities,
        collectionIds,
      };
    }
    default: {
      return state;
    }
  }
}
