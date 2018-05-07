import { Product } from './product';

export interface InvoiceItem {
  id?: number;
  invoice_id?: number;
  product_id: number;
  quantity: number;
  product?: Product;
  price?: number;
  error?: boolean;
}
