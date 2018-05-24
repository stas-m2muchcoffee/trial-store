import { createSelector } from '@ngrx/store';

import { IInvoicesState } from '../../../states';
import { getInvoicesRequestsState } from '../../../states/invoices-getter.state';

import { IInvoicesGetState } from './invoices-get.state';

export const getInvoicesGetRequestsState = createSelector(
  getInvoicesRequestsState,
  (state: IInvoicesState) => state.invoicesGetState,
);

export const getIsLoadedInvoicesGet = createSelector(
  getInvoicesGetRequestsState,
  (state: IInvoicesGetState) => state.loaded
);

export const getInvoicesGetData = createSelector(
  getInvoicesGetRequestsState,
  (state: IInvoicesGetState) => state.data
);
