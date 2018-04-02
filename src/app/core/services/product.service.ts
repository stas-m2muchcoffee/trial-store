import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Product } from '../../products/product';

@Injectable()
export class ProductService {
  private productsUrl = 'http://api.invoice-app.2muchcoffee.com/api/products';

  constructor(
    private http: HttpClient
  ) { }
  
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }

}
