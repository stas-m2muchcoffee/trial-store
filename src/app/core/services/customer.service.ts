import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Customer } from '../../customers/customer';

@Injectable()
export class CustomerService {
  
  customers$: Observable<Customer[]>;
  
  constructor(
    private http: HttpClient
  ) { }
  
  getCustomers(): void {
    this.customers$ = this.http.get<Customer[]>('customers');
  }
}
