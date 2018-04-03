import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { combineLatest } from 'rxjs/observable/combineLatest';

import { InvoiceService } from '../core/services/invoice.service';
import { Invoice } from './invoice';
import { CustomerService } from '../core/services/customer.service';
import { Customer } from '../customers/customer';
import { TransformInvoice } from './transformInvoice';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit, OnDestroy {
  invoices: Invoice[];
  customers: Customer[];
  subscription: Subscription;
  transformInvoices: Array<TransformInvoice>;
  displayedColumns = ['invoice_id', 'customer_name', 'discount', 'total', 'actions'];
  
  constructor(
    private invoiceService: InvoiceService,
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.getTransformInvoices();
  }
  
  getTransformInvoices() {
    this.subscription = combineLatest([this.invoiceService.getInvoices(), this.customerService.getCustomers()])
      .subscribe(resp => {
        this.transformInvoices = [];
        resp[0].map((invoice) => {
          let customer = resp[1].filter((customer) => {
            return customer.id == invoice.customer_id;
          });
          invoice.customer = customer[0];
          this.transformInvoices.push(invoice);
        });
        this.invoiceService.sendNumInvoices(this.transformInvoices.length);
      });
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
