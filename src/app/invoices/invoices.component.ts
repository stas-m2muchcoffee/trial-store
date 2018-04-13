import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';
import { MatDialog } from '@angular/material';

import { InvoiceService } from '../core/services/invoice.service';
import { Invoice } from './invoice';
import { CustomerService } from '../core/services/customer.service';
import { Customer } from '../customers/customer';
import { ModalWindowComponent } from './modal-window/modal-window.component';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {
  invoice$: Observable<Invoice[]>;
  displayedColumns = ['invoice_id', 'customer_name', 'discount', 'total', 'actions'];
  
  constructor(
    private invoiceService: InvoiceService,
    private customerService: CustomerService,
    private dialog: MatDialog
  ) {}
  
  ngOnInit() {
    this.getTransformInvoices();
  }
  
  getTransformInvoices() {
    this.invoice$ = Observable.combineLatest(
      this.invoiceService.invoices$,
      this.customerService.customers$
    )
    .map(([invoices, customers]: [Invoice[], Customer[]]) => {
      return invoices.map((invoice) => {
        invoice.customer = customers.find((customer) => customer.id === invoice.customer_id);
        return invoice;
      })
    });
  }
  
  openModalWindow(id: number): void {
    let dialogRef = this.dialog.open(ModalWindowComponent, {
      width: '250px',
      data: { id: id }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined) {
        this.deleteInvoice(result);
      }
    });
  }
  
  deleteInvoice(id: number) {
    this.invoiceService.deleteInvoice(id).subscribe(res => {
      this.invoice$ = this.invoice$.map(invoices => invoices.filter(invoice => invoice[id] === res[id]));
    });
  }
}
