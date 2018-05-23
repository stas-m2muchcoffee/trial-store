import { createSelector } from '@ngrx/store';

import { IInvoiceItemsState } from '../../../states';
import { getInvoiceItemsRequestsState } from '../../../states/invoice-items-getter.state';

import { IInvoiceItemPutState } from './invoice-item-put.state';

export const getInvoiceItemPutState = createSelector(
  getInvoiceItemsRequestsState,
  (state: IInvoiceItemsState) => state.invoiceItemPutState,
);

export const getIsLoadedInvoiceItemPut = createSelector(
  getInvoiceItemPutState,
  (state: IInvoiceItemPutState) => state.loaded
);

export const getInvoiceItemPutData = createSelector(
  getInvoiceItemPutState,
  (state: IInvoiceItemPutState) => state.data
);
