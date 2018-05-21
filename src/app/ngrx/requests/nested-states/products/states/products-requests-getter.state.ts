import { createSelector } from '@ngrx/store';

import { getRequestsState } from '../../../states/requests-getter.state';

import { IRequestsState } from '../../../states';

import { IProductsRequestsState } from './products-requests.state';


export const getProductsRequestsState = createSelector(
  getRequestsState,
  (state: IRequestsState) => state.productsRequestsState,
);

export const getIsLoadedProductsRequests = createSelector(
  getProductsRequestsState,
  (state: IProductsRequestsState) => state.loaded,
);
