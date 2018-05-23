import { createSelector } from '@ngrx/store';

import { IInvoiceItemsState } from '../../../states';
import { getInvoiceItemsRequestsState } from '../../../states/invoice-items-getter.state';

import { IInvoiceItemPostState } from './invoice-item-post.state';

export const getInvoiceItemPostState = createSelector(
  getInvoiceItemsRequestsState,
  (state: IInvoiceItemsState) => state.invoiceItemPostState,
);

export const getIsLoadedInvoiceItemPost = createSelector(
  getInvoiceItemPostState,
  (state: IInvoiceItemPostState) => state.loaded
);

export const getInvoiceItemPostData = createSelector(
  getInvoiceItemPostState,
  (state: IInvoiceItemPostState) => state.data
);
