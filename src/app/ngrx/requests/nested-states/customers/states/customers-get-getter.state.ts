import { createSelector } from '@ngrx/store';

import { getRequestsState } from '../../../states/requests-getter.state';

import { IRequestsState } from '../../../states';

import { ICustomersState } from './customers-get.state';


export const getCustomersRequestsState = createSelector(
  getRequestsState,
  (state: IRequestsState) => state.customersState,
);

export const getIsLoadedCustomersRequests = createSelector(
  getCustomersRequestsState,
  (state: ICustomersState) => state.loaded,
);
