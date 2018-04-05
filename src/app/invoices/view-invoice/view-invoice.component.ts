import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/combineLatest'

import { InvoiceItemsService } from '../../core/services/invoice-items.service';
import { InvoiceItem } from '../invoice-item';
import { Product } from '../../products/product';
import { Invoice } from '../invoice';
import { Customer } from '../../customers/customer';

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
    private invoiceItemsService: InvoiceItemsService
  ) { }

  ngOnInit() {
    this.invoice$ = this.invoiceItemsService.invoice$;
    this.customer$ = this.invoiceItemsService.customer$;
    
    this.invoiceItems$ = Observable.combineLatest(
      this.invoiceItemsService.invoiceItems$,
      this.invoiceItemsService.products$
    )
    .map(([invoiceItems, products]: [InvoiceItem[], Product[]]) => {
      return invoiceItems.map((invoiceItem) => {
        invoiceItem.product = products.find((product) => product.id === invoiceItem.product_id);
        return invoiceItem
      })
    });

  }

}
