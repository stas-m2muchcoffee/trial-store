import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import {Observable} from 'rxjs/Observable';

import { ProductService } from '../services/product.service';
import { Product } from '../interfaces/product';

@Injectable()
export class ProductsResolverService implements Resolve<Product[]> {
  constructor(
    private productService: ProductService
  ) {}
  resolve(): Observable<Product[]> {
    if (this.productService.products$) {
      return this.productService.products$;
    }
    return this.productService.getProducts();
  }
}
