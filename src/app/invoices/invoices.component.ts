import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { InvoiceService } from '../core/services/invoice.service';
import { Invoice } from './invoice';
import { CustomerService } from '../core/services/customer.service';
import { Customer } from '../customers/customer';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit, OnDestroy {
  invoices: Invoice[];
  customers: Customer[];
  invoicesSubscription: Subscription;
  customersSubscription: Subscription;

  constructor(
    private invoiceService: InvoiceService,
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.getInvoices();
    this.getCustomers();
  }
  
  getInvoices() {
    this.invoicesSubscription = this.invoiceService.getInvoices()
      .subscribe(invoices => this.invoices = invoices);
  }
  getCustomers() {
    this.customersSubscription = this.customerService.getCustomers()
      .subscribe(customers => this.customers = customers);
  }
  
  ngOnDestroy() {
    this.invoicesSubscription.unsubscribe();
    this.customersSubscription.unsubscribe();
  }

}
