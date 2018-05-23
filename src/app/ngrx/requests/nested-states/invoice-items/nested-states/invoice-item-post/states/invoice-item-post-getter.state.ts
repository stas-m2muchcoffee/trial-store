import { createSelector } from '@ngrx/store';

import { IInvoiceItemsState } from '../../../states';
import { getInvoiceItemsRequestsState } from '../../../states/invoice-items-getter.state';

import { IInvoiceItemsPostState } from './invoice-item-post.state';

export const getInvoiceItemPostState = createSelector(
  getInvoiceItemsRequestsState,
  (state: IInvoiceItemsState) => state.invoiceItemsPostState,
);

export const getIsLoadedInvoiceItemPost = createSelector(
  getInvoiceItemPostState,
  (state: IInvoiceItemsPostState) => state.loaded
);

export const getInvoiceItemPostData = createSelector(
  getInvoiceItemPostState,
  (state: IInvoiceItemsPostState) => state.data
);
