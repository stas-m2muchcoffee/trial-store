import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CustomerService } from '../core/services/customer.service';
import { Customer } from '../core/interfaces/customer';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
})
export class CustomersComponent implements OnInit {
  customers$: Observable<Customer[]>;
  displayedColumns = ['name', 'address', 'phone'];
  constructor(
    private customerService: CustomerService
  ) {}
  ngOnInit() {
    this.customers$ = this.customerService.customers$;
  }
}
