import { createSelector } from '@ngrx/store';

import { IInvoiceItemsRequestsState } from '../../../states';
import { getInvoiceItemsRequestsState } from '../../../states/invoice-items-getter.state';

import { IInvoiceItemsGetListRequestsState } from './invoice-items-get-list-requests.state';

export const getInvoiceItemsGetListRequestsState = createSelector(
  getInvoiceItemsRequestsState,
  (state: IInvoiceItemsRequestsState) => state.invoiceItemsGetListRequestsState,
);

export const getIsLoadedInvoiceItemsRequests = createSelector(
  getInvoiceItemsGetListRequestsState,
  (state: IInvoiceItemsGetListRequestsState) => state.loaded
);
