import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/switchMap';

import { Customer } from '../interfaces/customer';
import { CustomerService } from '../services/customer.service';

@Injectable()
export class CustomersResolverService implements Resolve<Customer[]> {

  constructor(
    private customerService: CustomerService
  ) {}

  resolve(): Observable<Customer[]> {
    return this.customerService.isData$
      .switchMap((isData) => {
        if (isData) {
          return this.customerService.customers$;
        }
        return this.customerService.getCustomers();
      })
      .take(1);
  }
}
