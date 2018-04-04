import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CustomerService } from '../core/services/customer.service';
import { Customer } from './customer';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  customers$: Observable<Customer[]>;
  displayedColumns = ['name', 'address', 'phone'];
  
  constructor(
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.customers$ = this.customerService.customers$;
  }

}
