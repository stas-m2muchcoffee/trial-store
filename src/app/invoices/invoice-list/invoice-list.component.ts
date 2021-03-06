import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';

import { Invoice } from '../../core/interfaces/invoice';
import { ModalService } from '../../core/services/modal.service';
import { InvoiceService } from '../../core/services/invoice.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
})
export class InvoiceListComponent implements OnInit, OnDestroy {
  invoices$: Observable<Invoice[]>;
  displayedColumns = ['invoice_id', 'customer_name', 'discount', 'total', 'actions'];
  deleteInvoiceChoiceSubscription: Subscription;

  deleteInvoice$: Subject<Invoice>;

  constructor(
    private modalService: ModalService,
    private invoiceService: InvoiceService,
  ) {}

  ngOnInit() {
    this.deleteInvoice$ = new Subject<Invoice>();
    this.invoices$ = this.invoiceService.invoices$;

    this.deleteInvoiceChoiceSubscription = this.deleteInvoice$
    .mergeMap((id) => {
      return this.modalService.confirmModal('Do you want to delete an invoice?')
      .filter((choice) => choice)
      .mapTo(id);
    })
    .switchMap((id) => this.invoiceService.deleteInvoice(id))
    .subscribe((invoice) => {
      this.modalService.confirmModal(`Invoice number ${invoice.id} was deleted`, false);
    });
  }

  ngOnDestroy() {
    this.deleteInvoiceChoiceSubscription.unsubscribe();
  }

  deleteInvoice(invoice: Invoice): void {
    this.deleteInvoice$.next(invoice);
  }
}

