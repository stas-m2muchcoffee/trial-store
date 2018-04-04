import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { ProductService } from '../../core/services/product.service';

@Injectable()
export class ProductsResolverService implements Resolve<any> {

  constructor(
    private productService: ProductService
  ) { }

  resolve() {
    this.productService.getProducts();
  }
}
