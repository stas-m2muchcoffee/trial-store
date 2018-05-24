import { createSelector } from '@ngrx/store';

import { IInvoicesState } from '../../../states';
import { getInvoicesRequestsState } from '../../../states/invoices-getter.state';

import { IInvoiceDeleteState } from './invoice-delete.state';

export const getInvoiceDeleteState = createSelector(
  getInvoicesRequestsState,
  (state: IInvoicesState) => state.invoiceDeleteState,
);

export const getIsLoadedInvoiceDelete = createSelector(
  getInvoiceDeleteState,
  (state: IInvoiceDeleteState) => state.loaded
);

export const getInvoiceDeleteData = createSelector(
  getInvoiceDeleteState,
  (state: IInvoiceDeleteState) => state.data
);
