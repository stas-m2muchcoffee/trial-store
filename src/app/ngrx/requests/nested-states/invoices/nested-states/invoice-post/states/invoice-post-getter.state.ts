import { createSelector } from '@ngrx/store';

import { IInvoicesState } from '../../../states';
import { getInvoicesRequestsState } from '../../../states/invoices-getter.state';

import { IInvoicePostState } from './invoice-post.state';

export const getInvoicePostState = createSelector(
  getInvoicesRequestsState,
  (state: IInvoicesState) => state.invoicePostState,
);

export const getIsLoadedInvoicePost = createSelector(
  getInvoicePostState,
  (state: IInvoicePostState) => state.loaded
);

export const getInvoicePostData = createSelector(
  getInvoicePostState,
  (state: IInvoicePostState) => state.data
);
