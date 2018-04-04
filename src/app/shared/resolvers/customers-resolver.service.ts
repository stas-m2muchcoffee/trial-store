import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { CustomerService } from '../../core/services/customer.service';

@Injectable()
export class CustomersResolverService implements Resolve<any> {

  constructor(
    private customerService: CustomerService
  ) { }
  
  resolve() {
    this.customerService.getCustomers();
  }

}
