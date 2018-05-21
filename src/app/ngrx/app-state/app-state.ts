import { IProductsState } from '../products/states';
import { productsReducer } from '../products/reducers';
import { IRequestsState } from '../requests/states';
import { requestsReducer } from '../requests/reducers';
import { ICustomersState } from '../customers/states';
import { customersReducer } from '../customers/reducers';
import { IInvoiceItemsState } from '../invoice-items/states';
import { invoiceItemsReducer } from '../invoice-items/reducers';

export interface AppState {
  readonly products: IProductsState;
  readonly customers: ICustomersState;
  readonly invoiceItems: IInvoiceItemsState;
  readonly requests: IRequestsState;
}

export const reducers = {
  products: productsReducer,
  customers: customersReducer,
  invoiceItems: invoiceItemsReducer,
  requests: requestsReducer,
};
