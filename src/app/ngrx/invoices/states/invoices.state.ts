import { Invoice } from '../../../core/interfaces/invoice';

export interface IInvoicesState {
  entities: { [index: number]: Invoice };
  collectionIds: number[];
  invoice: Invoice;
}

export const initialState: IInvoicesState = {
  entities: {},
  collectionIds: [],
  invoice: null,
};
