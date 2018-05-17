import { createSelector } from '@ngrx/store';

import { AppState } from '../../app-state/app-state';

import { ProductsState } from './';

const getProductsState = (state: AppState) => state.products;

export const getProductsEntities = createSelector(
  getProductsState,
  (state: ProductsState) => state.entities,
);

export const getProductsCollectionIds = createSelector(
  getProductsState,
  (state: ProductsState) => state.collectionIds,
);

export const getIsLoadedProducts = createSelector(
  getProductsState,
  (state: ProductsState) => state.isLoadedProducts,
);


export const getProducts = createSelector(
  getProductsEntities,
  getProductsCollectionIds,
  (entities, collectionIds) =>
    collectionIds.filter((id) => entities[id]).map(id => entities[id])
);
