import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/startWith';

@Component({
  selector: 'app-invoice-item',
  templateUrl: './invoice-item.component.html',
  styleUrls: ['./invoice-item.component.scss']
})
export class InvoiceItemComponent implements OnInit, OnDestroy {

  itemChangeSubscription: Subscription;
  invoicePrice = 0;

  @Input() item;
  @Input() products;

  get product_id(): FormControl {
    return this.item.get('product_id') as FormControl;
  }
  get quantity(): FormControl {
    return this.item.get('quantity') as FormControl;
  }

  ngOnInit() {
    this.itemChangeSubscription = this.item.valueChanges
    .startWith(this.item.value)
    .map((item) => {
      return this.products.find((product) => product.id === item.product_id);
    })
    .subscribe(product => {
      this.invoicePrice = product.price * this.quantity.value;
    });
  }

  ngOnDestroy() {
    this.itemChangeSubscription.unsubscribe();
  }
}
