import { Component, OnInit, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Product } from '../../core/interfaces/product';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-invoice-item',
  templateUrl: './invoice-item.component.html',
  styleUrls: ['./invoice-item.component.scss']
})
export class InvoiceItemComponent implements OnInit, OnDestroy {
  products$: Observable<Product[]>;
  itemChangeSubscription: Subscription;
  invoicePrice = 0;

  constructor(
    private productService: ProductService
  ) {}

  @Input() item;
  @Input() productPrice;
  @Output() invoicePriceChange = new EventEmitter<number>();

  get product_id(): FormControl {
    return this.item.get('product_id') as FormControl;
  }
  get quantity(): FormControl {
    return this.item.get('quantity') as FormControl;
  }

  ngOnInit() {
    this.products$ = this.productService.products$;

    this.itemChangeSubscription = Observable.combineLatest(
      this.products$,
      this.item.valueChanges
    )
    .map(([products, item]: [Product[], any]) => {
      return products.find((product) => product.id === item.product_id);
    })
    .subscribe(product => {
      this.invoicePrice = product.price * this.quantity.value;
      this.invoicePriceChange.emit(this.invoicePrice);
    });
  }

  ngOnDestroy() {
    this.itemChangeSubscription.unsubscribe();
  }
}
