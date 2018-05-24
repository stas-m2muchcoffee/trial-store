import { createSelector } from '@ngrx/store';

// interfaces
import { IRequestsState } from '../../../states';

// states
import { getRequestsState } from '../../../states/requests-getter.state';


export const getInvoicesRequestsState = createSelector(
  getRequestsState,
  (state: IRequestsState) => state.invoicesState
);
