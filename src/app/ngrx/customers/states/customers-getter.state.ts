import { createSelector } from '@ngrx/store';

import { AppState } from '../../app-state/app-state';

import { ICustomersState } from './';

const getCustomersState = (state: AppState) => state.customers;

export const getCustomersEntities = createSelector(
  getCustomersState,
  (state: ICustomersState) => state.entities,
);

export const getCustomersCollectionIds = createSelector(
  getCustomersState,
  (state: ICustomersState) => state.collectionIds,
);

export const getCustomers = createSelector(
  getCustomersEntities,
  getCustomersCollectionIds,
  (entities, collectionIds) =>
    collectionIds.filter((id) => entities[id]).map(id => entities[id])
);
