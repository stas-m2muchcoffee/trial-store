import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs/Subscription";

import { ProductService } from '../core/services/product.service';
import { Product } from './product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  displayedColumns = ['name', 'price'];
  subscription: Subscription;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.getProducts();
  }
  
  getProducts() {
    this.subscription = this.productService.getProducts()
      .subscribe(products => this.products = products);
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
