import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/publishLast';

import { Product } from '../interfaces/product';

@Injectable()
export class ProductService {
  private _products$: Observable<Product[]>;
  public products$: Observable<Product[]>;

  constructor(
    private http: HttpClient
  ) {}
  getProducts(): Observable<Product[]> {
    this._products$ = this.http.get<Product[]>('products');
    this.products$ = this._products$.publishLast().refCount();
    return this.products$;
  }
  getProduct(id: number | string): Observable<Product> {
    return this.http.get<Product>(`products/${id}`).publishLast().refCount();
  }
}
