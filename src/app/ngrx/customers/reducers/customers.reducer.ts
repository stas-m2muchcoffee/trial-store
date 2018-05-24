import { Actions, ActionTypes } from '../actions';
import { ICustomersState, initialState } from '../states';
import { getIdsArrEntities, setEntities, updateEntities } from '../../utils/util';

export function customersReducer(
  state: ICustomersState = initialState,
  {type, payload}: Actions,
): ICustomersState {
  switch (type) {

    case ActionTypes.GET_LIST_SUCCESS: {
      let entities = { ...state.entities };
      payload.forEach(customer => {
        entities = { ...setEntities(entities, customer) };
      });
      const collectionIds = getIdsArrEntities(entities);

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
