import { createSelector } from '@ngrx/store';

import { AppState } from '../../';

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

export const getInvoiceItems = createSelector(
  getInvoiceItemsEntities,
  getInvoiceItemsCollectionIds,
  (entities, collectionIds) =>
    collectionIds.filter((id) => entities[id]).map(id => entities[id])
);
