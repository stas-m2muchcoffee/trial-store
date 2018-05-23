import * as invoiceItemsActions from '../actions/invoice-items.actions';
import { IInvoiceItemsState, initialState } from '../states';

export function invoiceItemsReducer(
  state: IInvoiceItemsState = initialState,
  {type, payload}: invoiceItemsActions.Actions,
): IInvoiceItemsState {
  switch (type) {
<<<<<<< HEAD:src/app/ngrx/invoice-items/reducers/invoice-items.reducer.ts
    case invoiceItemsActions.ActionTypes.GET_LIST_SUCCESS: {
=======
    case invoiceItemsActions.ActionTypes.GET_LIST_SUCCESSFUL: {
>>>>>>> 67d0af25aae173ffc1d2a8ed0b6a728af5a1a9fe:src/app/ngrx/invoice-items/reducers/invoice-items-reducer.ts
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

<<<<<<< HEAD:src/app/ngrx/invoice-items/reducers/invoice-items.reducer.ts
    case invoiceItemsActions.ActionTypes.CREATE_SUCCESS:
    case invoiceItemsActions.ActionTypes.UPDATE_SUCCESS: {
=======
    case invoiceItemsActions.ActionTypes.CREATE_INVOICE_ITEM_SUCCESSFUL:
    case invoiceItemsActions.ActionTypes.UPDATE_INVOICE_ITEM_SUCCESSFUL: {
>>>>>>> 67d0af25aae173ffc1d2a8ed0b6a728af5a1a9fe:src/app/ngrx/invoice-items/reducers/invoice-items-reducer.ts
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
