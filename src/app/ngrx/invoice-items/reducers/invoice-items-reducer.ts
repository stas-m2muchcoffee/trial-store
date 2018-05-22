import * as invoiceItemsActions from '../actions/invoice-items-actions';
import { IInvoiceItemsState, initialState } from '../states';

export function invoiceItemsReducer(
  state: IInvoiceItemsState = initialState,
  {type, payload}: invoiceItemsActions.Actions,
): IInvoiceItemsState {
  switch (type) {
    case invoiceItemsActions.ActionTypes.GET_LIST_SUCCESSFUL: {
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

    default: {
      return state;
    }
  }
}
