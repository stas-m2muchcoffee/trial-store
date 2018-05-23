import * as invoiceItemsActions from '../actions/invoice-items.actions';
import { IInvoiceItemsState, initialState } from '../states';

export function invoiceItemsReducer(
  state: IInvoiceItemsState = initialState,
  {type, payload}: invoiceItemsActions.Actions,
): IInvoiceItemsState {
  switch (type) {
    case invoiceItemsActions.ActionTypes.GET_LIST_SUCCESS: {
      const entities = payload.reduce((accEntities, currentInvoiceItem) =>
          ({...accEntities, [currentInvoiceItem.id]: currentInvoiceItem}),
        {}
      );
      const collectionIds = payload.map(invoiceItem => invoiceItem.id);
      return {
        ...state,
        entities,
        collectionIds,
      };
    }

    case invoiceItemsActions.ActionTypes.CREATE_SUCCESS:
    case invoiceItemsActions.ActionTypes.UPDATE_SUCCESS: {
      const currentEntities = payload.reduce((accEntities, currentInvoiceItem) =>
          ({...accEntities, [currentInvoiceItem.id]: currentInvoiceItem}),
        {}
      );
      const entities = {...state.entities, ...currentEntities};
      const currentCollectionIds = payload.map(invoiceItem => invoiceItem.id);
      const collectionIds = [...state.collectionIds, ...currentCollectionIds];
      const currentInvoiceItemId = payload[0].id;
      return {
        ...state,
        entities,
        collectionIds,
        currentInvoiceItemId,
      };
    }

    default: {
      return state;
    }
  }
}
