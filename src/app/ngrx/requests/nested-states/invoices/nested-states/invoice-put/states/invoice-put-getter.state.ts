import { createSelector } from '@ngrx/store';

import { IInvoicesState } from '../../../states';
import { getInvoicesRequestsState } from '../../../states/invoices-getter.state';

import { IInvoicePutState } from './invoice-put.state';

export const getInvoicePutState = createSelector(
  getInvoicesRequestsState,
  (state: IInvoicesState) => state.invoicePutState,
);

export const getIsLoadedInvoicePut = createSelector(
  getInvoicePutState,
  (state: IInvoicePutState) => state.loaded
);

export const getInvoicePutData = createSelector(
  getInvoicePutState,
  (state: IInvoicePutState) => state.data
);
