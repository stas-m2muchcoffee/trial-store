import { createSelector } from '@ngrx/store';

import { getRequestsState } from '../../../../../states/requests-getter.state';

import { IRequestsState } from '../../../../../states';

import { IGetListInvoiceItemsRequestsState } from './get-list-invoice-items-requests.state';


export const getInvoiceItemsGetListRequestsState = createSelector(
  getRequestsState,
  (state: IRequestsState) => state.customersRequestsState,
);

export const getIsLoadedInvoiceItemsRequests = createSelector(
  getInvoiceItemsGetListRequestsState,
  (state: IGetListInvoiceItemsRequestsState) => state.loaded,
);
