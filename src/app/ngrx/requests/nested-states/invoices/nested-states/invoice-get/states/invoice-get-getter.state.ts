import { createSelector } from '@ngrx/store';

import { IInvoicesState } from '../../../states';
import { getInvoicesRequestsState } from '../../../states/invoices-getter.state';

import { IInvoiceGetState } from './invoice-get.state';

export const getInvoiceGetRequestsState = createSelector(
  getInvoicesRequestsState,
  (state: IInvoicesState) => state.invoiceGetState,
);

export const getIsLoadedInvoiceGet = createSelector(
  getInvoiceGetRequestsState,
  (state: IInvoiceGetState) => state.loaded
);

export const getInvoiceGetData = createSelector(
  getInvoiceGetRequestsState,
  (state: IInvoiceGetState) => state.data
);
