import { createSelector } from '@ngrx/store';

import { AppState } from '../../';

import { IInvoicesState } from './';


const getInvoicesState = (state: AppState) => state.invoices;

export const getInvoicesEntities = createSelector(
  getInvoicesState,
  (state: IInvoicesState) => state.entities,
);

export const getInvoicesCollectionIds = createSelector(
  getInvoicesState,
  (state: IInvoicesState) => state.collectionIds,
);

export const getInvoice = createSelector(
  getInvoicesState,
  (state: IInvoicesState) => state.invoice,
);

export const getInvoices = createSelector(
  getInvoicesEntities,
  getInvoicesCollectionIds,
  (entities, collectionIds) =>
    collectionIds.filter((id) => entities[id]).map(id => entities[id])
);
