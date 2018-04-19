import { Customer } from './customer';
import { InvoiceItem } from './invoice-item';

export interface Invoice {
  items: InvoiceItem[];
  id?: number;
  customer_id: number;
  discount: number;
  total: number;
  customer?: Customer;
  addProduct?: number;
}
