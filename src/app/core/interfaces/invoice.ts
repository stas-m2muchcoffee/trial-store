import {Customer} from './customer';

export interface Invoice {
  items: any[];
  id?: number;
  customer_id: number;
  discount: number;
  total: number;
  customer?: Customer;
}
