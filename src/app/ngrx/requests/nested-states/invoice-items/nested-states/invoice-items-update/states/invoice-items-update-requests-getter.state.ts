import { createSelector } from '@ngrx/store';

import { IInvoiceItemsRequestsState } from '../../../states';
import { getInvoiceItemsRequestsState } from '../../../states/invoice-items-getter.state';

import { IInvoiceItemsUpdateRequestsState } from './invoice-items-update-requests.state';

export const getInvoiceItemsUpdateRequestsState = createSelector(
  getInvoiceItemsRequestsState,
  (state: IInvoiceItemsRequestsState) => state.invoiceItemsUpdateRequestsState,
);

export const getIsLoadedInvoiceItemsRequests = createSelector(
  getInvoiceItemsUpdateRequestsState,
  (state: IInvoiceItemsUpdateRequestsState) => state.loaded
);
