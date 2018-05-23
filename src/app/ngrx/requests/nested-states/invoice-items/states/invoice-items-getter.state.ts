import { createSelector } from '@ngrx/store';

// interfaces
import { IRequestsState } from '../../../states';

// states
import { getRequestsState } from '../../../states/requests-getter.state';


export const getInvoiceItemsRequestsState = createSelector(
  getRequestsState,
  (state: IRequestsState) => state.invoiceItemsState
);
