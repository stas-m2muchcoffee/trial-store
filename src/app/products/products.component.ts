import { Component, OnInit } from '@angular/core';

import { ProductService } from '../core/services/product.service';
import { Product } from './product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[];
  displayedColumns = ['name', 'price'];

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.getProducts();
  }
  
  getProducts() {
    this.productService.getProducts()
      .subscribe(products => this.products = products);
  }
}
