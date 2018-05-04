import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { Customer } from '../interfaces/customer';
import { CustomerService } from '../services/customer.service';
import 'rxjs/add/operator/mergeAll';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/switchMap';


@Injectable()
export class CustomersResolverService implements Resolve<Customer[]> {
  constructor(
    private customerService: CustomerService
  ) {}
  resolve(): Observable<Customer[]> {
    // return this.customerService.customers$
    //   .switchMap(res => {
    //     if (res) {
    //       return this.customerService.customers$;
    //     }
    //     return this.customerService.getCustomers();
    //   })
    //   .take(1);
    return this.customerService.getCustomers()
      .take(1);
  }
}
