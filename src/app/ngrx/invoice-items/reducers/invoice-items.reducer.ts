import * as invoiceItemsActions from '../actions/invoice-items.actions';
import { IInvoiceItemsState, initialState } from '../states';

export function invoiceItemsReducer(
  state: IInvoiceItemsState = initialState,
  {type, payload}: invoiceItemsActions.Actions,
): IInvoiceItemsState {
  switch (type) {
    case invoiceItemsActions.ActionTypes.GET_LIST_SUCCESS:
    case invoiceItemsActions.ActionTypes.CREATE_SUCCESS: {
      const currentEntities = payload.reduce((accEntities, currentInvoiceItem) =>
          ({...accEntities, [currentInvoiceItem.id]: currentInvoiceItem}),
        {}
      );
      const entities = {...state.entities, ...currentEntities};
      const currentCollectionIds = payload.map(invoiceItem => invoiceItem.id);
      const collectionIds = [...state.collectionIds, ...currentCollectionIds];

      return {
        ...state,
        entities,
        collectionIds,
      };
    }

    case invoiceItemsActions.ActionTypes.UPDATE_SUCCESS: {
      const currentEntities = payload.reduce((accEntities, currentInvoiceItem) =>
          ({...accEntities, [currentInvoiceItem.id]: currentInvoiceItem}),
        {}
      );
      const entities = {...state.entities, ...currentEntities};

      return {
        ...state,
        entities,
      };
    }

    case invoiceItemsActions.ActionTypes.DELETE_SUCCESS: {
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

    default: {
      return state;
    }
  }
}
