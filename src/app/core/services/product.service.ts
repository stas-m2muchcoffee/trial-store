import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Product } from '../../products/product';

@Injectable()
export class ProductService {
  
  products$: Observable<Product[]>;

  constructor(
    private http: HttpClient
  ) { }
  
  getProducts(): void {
    this.products$ = this.http.get<Product[]>('products');
  }

}
