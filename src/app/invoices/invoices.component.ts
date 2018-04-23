import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/switchMap';

import { InvoiceService } from '../core/services/invoice.service';
import { CustomerService } from '../core/services/customer.service';
import { ModalService } from '../core/services/modal.service';
import { Invoice } from '../core/interfaces/invoice';
import { Customer } from '../core/interfaces/customer';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
})
export class InvoicesComponent implements OnInit, OnDestroy {
  invoice$: Observable<Invoice[]>;
  displayedColumns = ['invoice_id', 'customer_name', 'discount', 'total', 'actions'];
  deleteInvoiceChoiceSubscription: Subscription;

  deleteInvoice$: Subject<number> = new Subject<number>();

  constructor(
    private modalService: ModalService,
    private invoiceService: InvoiceService,
    private customerService: CustomerService
  ) {}
  ngOnInit() {
    this.getTransformInvoices();
    this.deleteInvoiceChoiceSubscription = this.deleteInvoice$
      .switchMap((id) => {
        return this.modalService.confirmModal('Do you want to delete an invoice?')
          .filter((choice) => choice)
          .mapTo(id);
      })
      .mergeMap((id) => this.invoiceService.deleteInvoice(id))
      .subscribe(() => {
        console.log('deleted');
      });
  }
  ngOnDestroy() {
    this.deleteInvoiceChoiceSubscription.unsubscribe();
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
        });
      });
  }
  deleteInvoice(id: number): void {
    this.deleteInvoice$.next(id);
  }
}
