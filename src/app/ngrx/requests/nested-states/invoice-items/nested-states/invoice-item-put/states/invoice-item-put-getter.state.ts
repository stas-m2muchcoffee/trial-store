import { createSelector } from '@ngrx/store';

import { IInvoiceItemsState } from '../../../states';
import { getInvoiceItemsRequestsState } from '../../../states/invoice-items-getter.state';

import { IInvoiceItemsPutState } from './invoice-item-put.state';

export const getInvoiceItemsPutState = createSelector(
  getInvoiceItemsRequestsState,
  (state: IInvoiceItemsState) => state.invoiceItemsPutState,
);

export const getIsLoadedInvoiceItemPut = createSelector(
  getInvoiceItemsPutState,
  (state: IInvoiceItemsPutState) => state.loaded
);
