import { createSelector } from '@ngrx/store';

import { IInvoiceItemsState } from '../../../states';
import { getInvoiceItemsRequestsState } from '../../../states/invoice-items-getter.state';

import { IInvoiceItemDeleteState } from './invoice-item-delete.state';

export const getInvoiceItemDeleteState = createSelector(
  getInvoiceItemsRequestsState,
  (state: IInvoiceItemsState) => state.invoiceItemDeleteState,
);

export const getIsLoadedInvoiceItemDelete = createSelector(
  getInvoiceItemDeleteState,
  (state: IInvoiceItemDeleteState) => state.loaded
);

export const getInvoiceItemDeleteData = createSelector(
  getInvoiceItemDeleteState,
  (state: IInvoiceItemDeleteState) => state.data
);
