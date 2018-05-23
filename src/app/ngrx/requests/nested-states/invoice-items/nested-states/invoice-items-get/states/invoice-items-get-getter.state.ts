import { createSelector } from '@ngrx/store';

import { IInvoiceItemsState } from '../../../states';
import { getInvoiceItemsRequestsState } from '../../../states/invoice-items-getter.state';

import { IInvoiceItemsGetState } from './invoice-items-get.state';

export const getInvoiceItemsGetListRequestsState = createSelector(
  getInvoiceItemsRequestsState,
  (state: IInvoiceItemsState) => state.invoiceItemsGetState,
);

export const getIsLoadedInvoiceItemsGet = createSelector(
  getInvoiceItemsGetListRequestsState,
  (state: IInvoiceItemsGetState) => state.loaded
);
