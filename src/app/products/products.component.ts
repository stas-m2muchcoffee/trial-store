import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ProductService } from '../core/services/product.service';
import { Product } from '../core/interfaces/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products$: Observable<Product[]>;

  displayedColumns = ['id', 'name', 'price'];
  constructor(
    private productService: ProductService
  ) { }
  ngOnInit() {
    this.products$ = this.productService.products$;
  }

  addProduct() {
    this.productService.addProduct();
  }

  deleteProducts(id) {
    this.productService.deleteProducts(id);
  }
}
