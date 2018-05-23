import { createSelector } from '@ngrx/store';

import { getRequestsState } from '../../../states/requests-getter.state';

import { IRequestsState } from '../../../states';

import { IProductsState } from './products-get.state';


export const getProductsRequestsState = createSelector(
  getRequestsState,
  (state: IRequestsState) => state.productsState,
);

export const getIsLoadedProductsRequests = createSelector(
  getProductsRequestsState,
  (state: IProductsState) => state.loaded,
);
