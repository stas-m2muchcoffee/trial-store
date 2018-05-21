import { createSelector } from '@ngrx/store';

import { getRequestsState } from '../../../states/requests-getter.state';

import { IRequestsState } from '../../../states';

import { ICustomersRequestsState } from './customers-requests.state';


export const getCustomersRequestsState = createSelector(
  getRequestsState,
  (state: IRequestsState) => state.customersRequestsState,
);

export const getIsLoadedCustomersRequests = createSelector(
  getCustomersRequestsState,
  (state: ICustomersRequestsState) => state.loaded,
);
