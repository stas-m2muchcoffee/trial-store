import * as invoicesActions from '../actions/invoices.actions';
import { IInvoicesState, initialState } from '../states';

export function invoicesReducer(
  state: IInvoicesState = initialState,
  {type, payload}: invoicesActions.Actions,
): IInvoicesState {
  switch (type) {

    case invoicesActions.ActionTypes.GET_LIST_SUCCESS: {
      const entities = payload.reduce((accEntities, currentInvoiceItem) =>
          ({...accEntities, [currentInvoiceItem.id]: currentInvoiceItem}),
        {}
      );
      const collectionIds = payload.map((item) => item.id);

      return {
        ...state,
        entities,
        collectionIds,
      };
    }

    case invoicesActions.ActionTypes.CREATE_SUCCESS:
    case invoicesActions.ActionTypes.UPDATE_SUCCESS: {
      const currentEntities = payload.reduce((accEntities, currentInvoiceItem) =>
          ({...accEntities, [currentInvoiceItem.id]: currentInvoiceItem}),
        {}
      );
      const entities = {...state.entities, ...currentEntities};
      const currentCollectionIds = [
        ...state.collectionIds,
        ...payload.map(item => item.id)
      ];
      const collectionIds = currentCollectionIds
      .filter((id, pos) => currentCollectionIds.indexOf(id) === pos);

      return {
        ...state,
        entities,
        collectionIds,
      };
    }

    case invoicesActions.ActionTypes.DELETE_SUCCESS: {
      const entities = { ...state.entities };
      payload.forEach((entity) => {
        delete entities[entity.id];
      });
      const collectionIds = state.collectionIds
      .filter((id) => !payload.find((entity) => entity.id === id));

      return {
        ...state,
        entities,
        collectionIds,
      };
    }

    case invoicesActions.ActionTypes.GET_SUCCESS: {

      const invoice = { ...state.invoice, ...payload };

      return {
        ...state,
        invoice,
      };
    }

    default: {
      return state;
    }
  }
}
