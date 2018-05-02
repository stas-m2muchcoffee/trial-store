import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mapTo';

import { ProductService } from '../core/services/product.service';
import { Product } from '../core/interfaces/product';
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/do';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products$: Observable<Product[]>;
  viewTemplateProduct$: Observable<Product>;
  addProduct$: Subject<any> = new Subject<any>();
  removeProduct$: Subject<any> = new Subject<any>();
  addProductRequest: Observable<Product>;
  removeProductRequest: Observable<Product>;
  displayedColumns = ['id', 'name', 'price', 'del'];

  constructor(
    private productService: ProductService
  ) { }
  ngOnInit() {
    this.products$ = this.productService.products$;

    this.addProductRequest = this.addProduct$
      .switchMap(() => this.productService.addProduct())
      .shareReplay(1);
    this.addProductRequest.subscribe();

    this.viewTemplateProduct$ = Observable.merge(
      this.addProductRequest,
      this.addProductRequest
        .delay(2000)
        .mapTo(null)
    );

    this.removeProductRequest = this.removeProduct$
      .switchMap((id) => this.productService.deleteProducts(id))
      .shareReplay(1);
    this.removeProductRequest.subscribe();
  }

  addProduct() {
    this.addProduct$.next(null);
  }

  deleteProduct(id) {
    this.removeProduct$.next(id);
    // this.productService.deleteProducts(id);
  }
}
