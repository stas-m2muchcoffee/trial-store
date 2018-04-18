import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { CustomerService } from '../../core/services/customer.service';
import { Customer } from '../../customers/customer';


@Injectable()
export class CustomersResolverService implements Resolve<Customer[]> {

  constructor(
    private customerService: CustomerService
  ) { }
  
  resolve(): Observable<Customer[]> {
    return this.customerService.getCustomers();
  }

}
