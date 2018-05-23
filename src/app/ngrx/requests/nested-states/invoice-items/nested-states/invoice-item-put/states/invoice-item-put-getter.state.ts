import { createSelector } from '@ngrx/store';

import { IInvoiceItemsState } from '../../../states';
import { getInvoiceItemsRequestsState } from '../../../states/invoice-items-getter.state';

import { IInvoiceItemsPutState } from './invoice-item-put.state';

export const getInvoiceItemPutState = createSelector(
  getInvoiceItemsRequestsState,
  (state: IInvoiceItemsState) => state.invoiceItemsPutState,
);

export const getIsLoadedInvoiceItemPut = createSelector(
  getInvoiceItemPutState,
  (state: IInvoiceItemsPutState) => state.loaded
);

export const getInvoiceItemPutData = createSelector(
  getInvoiceItemPutState,
  (state: IInvoiceItemsPutState) => state.data
);
