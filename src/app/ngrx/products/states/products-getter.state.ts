import { createSelector } from '@ngrx/store';

import { AppState } from '../../app-state/app-state';

import { IProductsState } from './';

const getProductsState = (state: AppState) => state.products;

export const getProductsEntities = createSelector(
  getProductsState,
  (state: IProductsState) => state.entities,
);

export const getProductsCollectionIds = createSelector(
  getProductsState,
  (state: IProductsState) => state.collectionIds,
);

export const getProducts = createSelector(
  getProductsEntities,
  getProductsCollectionIds,
  (entities, collectionIds) =>
    collectionIds.filter((id) => entities[id]).map(id => entities[id])
);
