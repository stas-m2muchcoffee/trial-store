import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { Product } from '../../core/interfaces/product';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-invoice-item',
  templateUrl: './invoice-item.component.html',
  styleUrls: ['./invoice-item.component.scss']
})
export class InvoiceItemComponent implements OnInit {
  products$: Observable<Product[]>;
  priceAll: number;

  constructor(
    private productService: ProductService
  ) {}

  @Input() item;

  get invoice_id(): FormControl {
    return this.item.get('invoice_id') as FormControl;
  }
  get product_id(): FormControl {
    return this.item.get('product_id') as FormControl;
  }
  get quantity(): FormControl {
    return this.item.get('quantity') as FormControl;
  }
  get price(): FormControl {
    return this.item.get('price') as FormControl;
  }

  ngOnInit() {
    this.products$ = this.productService.products$;

    this.item.valueChanges.subscribe((item) => {
      console.log(item);
      this.priceAll = +(this.price.value * this.quantity.value).toFixed(2);
    });
  }

}
