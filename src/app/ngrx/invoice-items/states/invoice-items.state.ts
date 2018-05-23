import { InvoiceItem } from '../../../core/interfaces/invoice-item';

export interface IInvoiceItemsState {
  entities: { [index: number]: InvoiceItem };
  collectionIds: number[];
}

export const initialState: IInvoiceItemsState = {
  entities: {},
  collectionIds: [],
};
