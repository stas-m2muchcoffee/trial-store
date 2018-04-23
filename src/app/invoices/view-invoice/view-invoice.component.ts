import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/combineLatest';

import { InvoiceItemsService } from '../../core/services/invoice-items.service';
import { ProductService } from '../../core/services/product.service';
import { CustomerService } from '../../core/services/customer.service';
import { InvoiceService } from '../../core/services/invoice.service';
import { InvoiceItem } from '../../core/interfaces/invoice-item';
import { Invoice } from '../../core/interfaces/invoice';
import { Customer } from '../../core/interfaces/customer';
import { Product } from '../../core/interfaces/product';

@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.scss']
})
export class ViewInvoiceComponent implements OnInit {
  invoiceItems$: Observable<InvoiceItem[]>;
  invoice$: Observable<Invoice>;
  customer$: Observable<Customer>;
  constructor(
    private invoiceItemsService: InvoiceItemsService,
    private productService: ProductService,
    private invoiceService: InvoiceService,
    private customerService: CustomerService
  ) {}
  ngOnInit() {
    this.invoice$ = this.invoiceService.invoice$;
    this.invoiceItems$ = Observable.combineLatest(
      this.invoiceItemsService.invoiceItems$,
      this.invoiceItemsService.invoiceItems$
        .switchMap(invoices => Observable.zip(...invoices.map(invoice => this.productService.getProduct(invoice.product_id))))
    )
    .map(([invoiceItems, products]: [InvoiceItem[], Product[]]) => {
      return invoiceItems.map((invoiceItem) => {
        invoiceItem.product = products.find((product) => product.id === invoiceItem.product_id);
        return invoiceItem;
      });
    });
    this.customer$ = this.invoice$.switchMap(invoice => this.customerService.getCustomer(invoice.customer_id));
  }
}
