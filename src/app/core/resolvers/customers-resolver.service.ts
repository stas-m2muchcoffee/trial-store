import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { Customer } from '../interfaces/customer';
import { CustomerService } from '../services/customer.service';


@Injectable()
export class CustomersResolverService implements Resolve<Customer[]> {
  constructor(
    private customerService: CustomerService
  ) {}
  resolve(): Observable<Customer[]> {
    return this.customerService.getCustomers();
  }
}
