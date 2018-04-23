import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/publishLast';

import {Customer} from '../interfaces/customer';

@Injectable()
export class CustomerService {
  customers$: Observable<Customer[]>;
  constructor(
    private http: HttpClient
  ) { }
  getCustomers(): Observable<Customer[]> {
    return this.customers$ = this.http.get<Customer[]>('customers').publishLast().refCount();
  }
  getCustomer(id: number | string): Observable<Customer> {
    return this.http.get<Customer>(`customers/${id}`).publishLast().refCount();
  }
}
