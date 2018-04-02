import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs/Subscription";

import { CustomerService } from '../core/services/customer.service';
import { Customer } from './customer';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit, OnDestroy {
  customers: Customer[];
  displayedColumns = ['name', 'address', 'phone'];
  subscription: Subscription;
  
  constructor(
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.getCustomers();
  }
  
  getCustomers() {
    this.subscription = this.customerService.getCustomers()
      .subscribe(customers => this.customers = customers);
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
