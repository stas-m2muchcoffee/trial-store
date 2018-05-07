import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {ConnectableObservable} from 'rxjs/observable/ConnectableObservable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/filter';

import { StateManagement, StateRequests } from '../../shared/state-management';

import { Invoice } from '../interfaces/invoice';
import { Action } from '../interfaces/action';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8'
  })
};

@Injectable()
export class InvoiceService {
  isData$: ConnectableObservable<boolean>;
  invoices$: ConnectableObservable<Invoice[]>;
  invoice$: ConnectableObservable<Invoice>;
  addedInvoice$: ConnectableObservable<Invoice>;
  updatedInvoice$: ConnectableObservable<Invoice>;
  deletedInvoice$: ConnectableObservable<Invoice>;
  stateManagement: StateManagement<Invoice> = new StateManagement<Invoice>();

  constructor(private http: HttpClient) {
    this.isData$ = this.stateManagement.responseData$
    .scan((isData: boolean, {type}: Action) => {
      if (type === StateRequests.GetList || type === StateRequests.Add || type === StateRequests.Get) {
        return true;
      }
    }, false)
    .publishBehavior(false);
    this.isData$.connect();

    this.invoices$ = Observable.combineLatest(
      this.stateManagement.entities$,
      this.stateManagement.collectionIds$
    )
    .map(([entities, ids]: [{ [index: number]: Invoice }, number[]]) => ids.map((id) => entities[id]))
    .publishReplay(1);
    this.invoices$.connect();

    this.invoice$ = Observable.combineLatest(
      this.stateManagement.entities$,
      this.stateManagement.entityId$
    )
    .map(([entities, id]: [{ [index: number]: Invoice }, number]) => entities[id])
    .publishReplay(1);
    this.invoice$.connect();

    this.addedInvoice$ = Observable.combineLatest(
      this.stateManagement.entities$,
      this.stateManagement.addEntityId$
    )
    .map(([entities, id]: [{ [index: number]: Invoice }, number]) => entities[id])
    .publishReplay(1);
    this.addedInvoice$.connect();

    this.updatedInvoice$ = Observable.combineLatest(
      this.stateManagement.entities$,
      this.stateManagement.updateEntityId$
    )
    .map(([entities, id]: [{ [index: number]: Invoice }, number]) => entities[id])
    .publishReplay(1);
    this.updatedInvoice$.connect();

    this.deletedInvoice$ = this.stateManagement.responseData$
    .filter((responseData) => responseData.type === StateRequests.Remove)
    .map((responseData) => responseData.value[0])
    .publishReplay(1);
    this.deletedInvoice$.connect();
  }

  getInvoices(): Observable<Invoice[]> {
    this.stateManagement.getList$.next(this.http.get<Invoice[]>('invoices'));
    return this.invoices$;
  }

  getInvoice(id: number | string): Observable<Invoice> {
    this.stateManagement.get$.next(this.http.get<Invoice>(`invoices/${id}`));
    return this.invoice$;
  }

  createInvoice(invoice: Invoice): Observable<Invoice> {
    this.stateManagement.add$.next(this.http.post<Invoice>('invoices', invoice, httpOptions));
    return this.addedInvoice$;
  }

  deleteInvoice(id: number): Observable<Invoice> {
    this.stateManagement.remove$.next(this.http.delete<Invoice>(`invoices/${id}`, httpOptions));
    return this.deletedInvoice$;
  }

  updateInvoice(invoice: Invoice, id: number | string): Observable<Invoice> {
    this.stateManagement.update$.next(this.http.put<Invoice>(`invoices/${id}`, invoice, httpOptions));
    return this.updatedInvoice$;
  }
}
