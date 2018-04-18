import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { Product } from '../interfaces/product';

@Injectable()
export class ProductService {
  products$: Observable<Product[]>;
  constructor(
    private http: HttpClient
  ) {}
  getProducts(): Observable<Product[]> {
    return this.products$ = this.http.get<Product[]>('products');
  }
  getProduct(id: number | string): Observable<Product> {
    return this.http.get<Product>(`products/${id}`);
  }
}
