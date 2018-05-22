import * as invoiceItemsActions from '../actions/invoice-items-actions';
import { IInvoiceItemsState, initialState } from '../states';

export function invoiceItemsReducer(
  state: IInvoiceItemsState = initialState,
  {type, payload}: invoiceItemsActions.Actions,
): IInvoiceItemsState {
  switch (type) {
    case invoiceItemsActions.ActionTypes.GET_LIST_SUCCESSFUL:
    case invoiceItemsActions.ActionTypes.CREATE_INVOICE_ITEM_SUCCESSFUL: {
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
