import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/combineLatest';

import { Customer } from '../../customers/customer';
import { CustomerService } from '../../core/services/customer.service';
import { InvoiceItemsService } from '../../core/services/invoice-items.service';
import { InvoiceItem } from '../invoice-item';
import { Product } from '../../products/product';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.scss']
})
export class EditInvoiceComponent implements OnInit {
  
  customers$: Observable<Customer[]>;
  selectedCustomer: string;
  invoiceItems$: Observable<InvoiceItem[]>;
  products$: Observable<Product[]>;
  selectedProduct: string[] = [];
  selectedQuantity: any[] =[];
  nums: number[] = [];
  
  constructor(
    private customerService: CustomerService,
    private invoiceItemsService: InvoiceItemsService,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.customers$ = this.customerService.customers$;
    this.invoiceItemsService.customer$.subscribe(customer => this.selectedCustomer = customer.name);
    
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
  
    this.products$ = this.productService.products$;
    this.invoiceItems$.subscribe(invoiceItems => invoiceItems.map(invoiceItem => {
      this.selectedProduct.push(invoiceItem.product.name);
      this.selectedQuantity.push(invoiceItem.quantity);
      console.log(this.selectedProduct, this.selectedQuantity)
    }));
    
    this.f();
    }
  
  f() {
    let start = 0;
    while (start <= 100) {
      this.nums.push(start++);
    };
    console.log(this.nums);
  }
}
