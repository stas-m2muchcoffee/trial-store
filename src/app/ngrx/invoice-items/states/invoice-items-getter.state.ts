import { createSelector } from '@ngrx/store';

import { AppState } from '../../app-state/app-state';

import { IInvoiceItemsState } from './';

const getInvoiceItemsState = (state: AppState) => state.invoiceItems;

export const getInvoiceItemsEntities = createSelector(
  getInvoiceItemsState,
  (state: IInvoiceItemsState) => state.entities,
);

export const getInvoiceItemsCollectionIds = createSelector(
  getInvoiceItemsState,
  (state: IInvoiceItemsState) => state.collectionIds,
);

export const getInvoiceItemsCurrentId = createSelector(
  getInvoiceItemsState,
  (state: IInvoiceItemsState) => state.currentInvoiceItemId,
);

export const getInvoiceItems = createSelector(
  getInvoiceItemsEntities,
  getInvoiceItemsCollectionIds,
  (entities, collectionIds) =>
    collectionIds.filter((id) => entities[id]).map(id => entities[id])
);

export const getAddedInvoiceItems = createSelector(
  getInvoiceItemsEntities,
  getInvoiceItemsCurrentId,
  (entities, id) => entities[id],
);
