import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/publishBehavior';

import { AppState } from '../../ngrx';
import * as customersGetterState from '../../ngrx/customers/states/customers-getter.state';
import * as invoices from '../../ngrx/invoices/actions';
import * as invoicesGetterState from '../../ngrx/invoices/states/invoices-getter.state';
import * as invoiceItemsGetterState from '../../ngrx/invoice-items/states/invoice-items-getter.state';
import * as invoicePostGetterState from
'../../ngrx/requests/nested-states/invoices/nested-states/invoice-post/states/invoice-post-getter.state';
import * as invoicePutGetterState from
'../../ngrx/requests/nested-states/invoices/nested-states/invoice-put/states/invoice-put-getter.state';
import * as invoiceDeleteGetterState from
'../../ngrx/requests/nested-states/invoices/nested-states/invoice-delete/states/invoice-delete-getter.state';
import * as invoicesGetGetterState from
'../../ngrx/requests/nested-states/invoices/nested-states/invoices-get/states/invoices-get-getter.state';
import * as invoiceGetGetterState from
'../../ngrx/requests/nested-states/invoices/nested-states/invoice-get/states/invoice-get-getter.state';

import { Invoice } from '../interfaces/invoice';
import { CustomerService } from './customer.service';
import { InvoiceItemsService } from './invoice-items.service';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8'
  })
};

@Injectable()
export class InvoiceService {

  invoices$: Observable<Invoice[]>;
  invoice$: Observable<Invoice>;
  addedInvoice$: Observable<Invoice>;
  updatedInvoice$: Observable<Invoice>;
  deletedInvoice$: Observable<Invoice>;

  isData$: Observable<boolean>;

  constructor(
    private http: HttpClient,
    private customerService: CustomerService,
    private invoiceItemsService: InvoiceItemsService,
    private store: Store<AppState>,
  ) {
    this.isData$ = this.store.select(invoicesGetGetterState.getIsLoadedInvoicesGet);

    this.invoices$ = this.store.select(invoicesGetterState.getInvoices)
    .withLatestFrom(this.store.select(invoicesGetGetterState.getIsLoadedInvoicesGet))
    .filter(([_invoices, isData]) => isData)
    .map(([_invoices, isData]) => _invoices)
    // add customer
    .combineLatest(this.store.select(customersGetterState.getCustomersEntities).startWith({}))
    .map(([_invoices, entitiesCustomers]) => {
      return _invoices.map((invoice) => {
        return ({
          ...invoice,
          customer: entitiesCustomers[invoice.customer_id],
        });
      });
    })
    // add items
    .combineLatest(this.invoiceItemsService.invoiceItems$.startWith([]))
    .map(([_invoices, items]) => {
      return _invoices.map((invoice) => {
        return ({
          ...invoice,
          items: items.filter((item) => item.invoice_id === invoice.id)
        });
      });
    });

    this.invoice$ = this.store.select(invoicesGetterState.getInvoice)
    .withLatestFrom(this.store.select(invoiceGetGetterState.getIsLoadedInvoiceGet))
    .filter(([_invoices, isData]) => isData)
    .map(([_invoices, isData]) => _invoices)
    // add customer
    .combineLatest(this.store.select(customersGetterState.getCustomersEntities).startWith({}))
    .map(([invoice, entitiesCustomers]) => {
      return ({
        ...invoice,
        customer: entitiesCustomers[invoice.customer_id],
      });
    })
    // add items
    .combineLatest(this.store.select(invoiceItemsGetterState.getInvoiceItems).startWith([]))
    .map(([invoice, items]) => {
      return ({
        ...invoice,
        items: items.filter((item) => item.invoice_id === invoice.id)
      });
    });

    this.addedInvoice$ = this.store.select(invoicePostGetterState.getInvoicePostData)
    .withLatestFrom(this.store.select(invoicePostGetterState.getIsLoadedInvoicePost))
    .filter(([items, isData]) => isData)
    .map(([invoice, isData]) => invoice);

    this.updatedInvoice$ = this.store.select(invoicePutGetterState.getInvoicePutData)
    .withLatestFrom(this.store.select(invoicePutGetterState.getIsLoadedInvoicePut))
    .filter(([items, isData]) => isData)
    .map(([invoice, isData]) => invoice);

    this.deletedInvoice$ = this.store.select(invoiceDeleteGetterState.getInvoiceDeleteData)
    .withLatestFrom(this.store.select(invoiceDeleteGetterState.getIsLoadedInvoiceDelete))
    .filter(([items, isData]) => isData)
    .map(([invoice, isData]) => invoice);
  }

  getInvoicesRequest(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>('invoices');
  }

  getInvoices(): Observable<Invoice[]> {
    this.store.dispatch(new invoices.GetInvoicesAction);
    return this.invoices$;
  }

  getInvoiceRequest(id: number | string): Observable<Invoice> {
    return this.http.get<Invoice>(`invoices/${id}`);
  }

  getInvoice(id: number | string): Observable<Invoice> {
    this.store.dispatch(new invoices.GetInvoiceAction(id));
    return this.invoice$;
  }

  createInvoiceRequest(invoice: Invoice): Observable<Invoice> {
    return this.http.post<Invoice>('invoices', invoice, httpOptions);
  }

  createInvoice(invoice: Invoice): Observable<Invoice> {
    this.store.dispatch(new invoices.CreateInvoiceAction(invoice));
    return this.addedInvoice$;
  }

  deleteInvoiceRequest(invoice: Invoice): Observable<Invoice> {
    return this.http.delete<Invoice>(`invoices/${invoice.id}`, httpOptions);
  }

  deleteInvoice(invoice: Invoice): Observable<Invoice> {
    this.store.dispatch(new invoices.DeleteInvoiceAction(invoice));
    return this.deletedInvoice$;
  }

  updateInvoiceRequest(invoice: Invoice): Observable<Invoice> {
    return this.http.put<Invoice>(`invoices/${invoice.id}`, invoice, httpOptions);
  }

  updateInvoice(invoice: Invoice): Observable<Invoice> {
    this.store.dispatch(new invoices.UpdateInvoiceAction(invoice));
    return this.updatedInvoice$;
  }
}
