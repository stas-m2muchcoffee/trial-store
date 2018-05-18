import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/switchMap';

import { ProductService } from '../services/product.service';
import { Product } from '../interfaces/product';

@Injectable()
export class ProductsResolverService implements Resolve<Product[]> {

  constructor(
    private productService: ProductService,
  ) {}

  resolve(): Observable<Product[]> {
    return this.productService.isData$
    .switchMap((isData) => {
      if (isData) {
        return this.productService.products$;
      }
      return this.productService.dispatchGetListProductAction();
    })
    .take(1);
  }
}
