import { Customer } from '../customers/customer';

export interface Invoice {
  items: any[];
  id?: number;
  customer_id: number;
  discount: number;
  total: number;
  customer?: Customer;
}
