import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../core/services/customer.service';

import { Customer } from './customer';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  customers: Customer[];
  displayedColumns = ['name', 'address', 'phone'];
  
  constructor(
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.getCustomers();
  }
  
  getCustomers() {
    this.customerService.getCustomers()
      .subscribe(customers => this.customers = customers);
  }

}
