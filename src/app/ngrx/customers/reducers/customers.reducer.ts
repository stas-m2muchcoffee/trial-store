import { Actions, ActionTypes } from '../actions';
import { ICustomersState, initialState } from '../states';

export function customersReducer(
  state: ICustomersState = initialState,
  {type, payload}: Actions,
): ICustomersState {
  switch (type) {

    case ActionTypes.GET_LIST_SUCCESS: {
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
