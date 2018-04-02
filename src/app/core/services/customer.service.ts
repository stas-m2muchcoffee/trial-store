import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Customer } from '../../customers/customer';

@Injectable()
export class CustomerService {
  private customersUrl = 'http://api.invoice-app.2muchcoffee.com/api/customers';
  
  constructor(
    private http: HttpClient
  ) { }
  
  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.customersUrl);
  }
}
