import { createSelector } from '@ngrx/store';

import { IInvoiceItemsRequestsState } from '../../../states';
import { getInvoiceItemsRequestsState } from '../../../states/invoice-items-getter.state';

import { IInvoiceItemsCreateRequestsState } from './invoice-items-create-requests.state';

export const getInvoiceItemsCreateRequestsState = createSelector(
  getInvoiceItemsRequestsState,
  (state: IInvoiceItemsRequestsState) => state.invoiceItemsCreateRequestsState,
);

export const getIsLoadedInvoiceItemsRequests = createSelector(
  getInvoiceItemsCreateRequestsState,
  (state: IInvoiceItemsCreateRequestsState) => state.loaded
);
