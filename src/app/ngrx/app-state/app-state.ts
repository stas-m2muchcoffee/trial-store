import * as fromProducts from '../products/index';
import * as fromCustomers from '../customers/index';
import * as fromInvoiceItems from '../invoice-items/index';
import * as fromInvoices from '../invoices/index';
import * as fromRequests from '../requests/index';

export interface AppState {
  readonly products: fromProducts.IProductsState;
  readonly customers: fromCustomers.ICustomersState;
  readonly invoiceItems: fromInvoiceItems.IInvoiceItemsState;
  readonly invoices: fromInvoices.IInvoicesState;
  readonly requests: fromRequests.IRequestsState;
}

export const reducers = {
  products: fromProducts.productsReducer,
  customers: fromCustomers.customersReducer,
  invoiceItems: fromInvoiceItems.invoiceItemsReducer,
  invoices: fromInvoices.invoicesReducer,
  requests: fromRequests.requestsReducer,
};
