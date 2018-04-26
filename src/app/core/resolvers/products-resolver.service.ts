import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import {Observable} from 'rxjs/Observable';

import { ProductService } from '../services/product.service';
import { Product } from '../interfaces/product';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/publishLast';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/shareReplay';

@Injectable()
export class ProductsResolverService implements Resolve<Product[]> {
  constructor(
    private productService: ProductService
  ) {}
  resolve(): Observable<Product[]> {
    // if (this.productService.products$) {
    //   return this.productService.products$;
    // }
    // return Observable.of(null)

    return this.productService.getProducts()
      .take(1);
  }
}
