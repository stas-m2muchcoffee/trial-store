import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/debounceTime';

import { StateManagement } from '../../shared/state-management';

import { Invoice } from '../interfaces/invoice';
import { CustomerService } from './customer.service';
import { InvoiceItemsService } from './invoice-items.service';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/shareReplay';

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
  state: StateManagement<Invoice>;

  constructor(
    private http: HttpClient,
    private customerService: CustomerService,
    private invoiceItemsService: InvoiceItemsService,
  ) {
    this.state = new StateManagement<Invoice>();

    this.invoices$ = Observable.combineLatest(
      this.state.entities$,
      this.state.collectionIds$
    )
    .map(([entities, ids]: [{ [index: number]: Invoice }, number[]]) =>
      ids.filter((id) => entities[id]).map((id) => entities[id])
    )
    // add customer
    .combineLatest(this.customerService.customers$)
    .map(([invoices, customers]) => {
      return invoices.map((invoice) => {
        return ({
          ...invoice,
          customer: customers.find((customer) => customer.id === invoice.customer_id)
        });
      });
    })
    // add items
    .combineLatest(this.invoiceItemsService.invoiceItems$.startWith([]))
    .map(([invoices, items]) => {
      return invoices.map((invoice) => {
        return ({
          ...invoice,
          items: items.filter((item) => item.invoice_id === invoice.id)
        });
      });
    })
    .shareReplay(1);

    this.invoice$ = Observable.combineLatest(
      this.state.entities$,
      this.state.entityId$
    )
    .map(([entities, id]: [{ [index: number]: Invoice }, number]) => entities[id])
    // add customer
    .combineLatest(this.customerService.customers$)
    .map(([invoice, customers]) => {
      return ({
        ...invoice,
        customer: customers.find((customer) => customer.id === invoice.customer_id)
      });
    })
    // add invoices
    .combineLatest(this.invoiceItemsService.invoiceItems$.startWith([]))
    .map(([invoice, items]) => {
      return ({
        ...invoice,
        items: items.filter((item) => item.invoice_id === invoice.id)
      });
    })
    .share();

    this.addedInvoice$ = Observable.combineLatest(
      this.state.entities$,
      this.state.addEntityId$
    )
    .debounceTime(10)
    .map(([entities, id]: [{ [index: number]: Invoice }, number]) => entities[id]);

    this.updatedInvoice$ = Observable.combineLatest(
      this.state.entities$,
      this.state.updateEntityId$
    )
    .debounceTime(10)
    .map(([entities, id]: [{ [index: number]: Invoice }, number]) => entities[id]);
  }

  getInvoices(): Observable<Invoice[]> {
    this.state.getList$.next(this.http.get<Invoice[]>('invoices'));
    return this.invoices$;
  }

  getInvoice(id: number | string): Observable<Invoice> {
    this.state.get$.next(this.http.get<Invoice>(`invoices/${id}`));
    return this.invoice$;
  }

  createInvoice(invoice: Invoice): Observable<Invoice> {
    this.state.add$.next(this.http.post<Invoice>('invoices', invoice, httpOptions));
    return this.addedInvoice$;
  }

  deleteInvoice(invoice: Invoice): Observable<Invoice> {
    this.state.remove$.next(this.http.delete<Invoice>(`invoices/${invoice.id}`, httpOptions).mapTo(invoice));
    return this.state.removeResponse$;
  }

  updateInvoice(invoice: Invoice): Observable<Invoice> {
    this.state.update$.next(this.http.put<Invoice>(`invoices/${invoice.id}`, invoice, httpOptions));
    return this.updatedInvoice$;
  }
}
