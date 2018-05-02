import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/publishLast';

import { Invoice } from '../interfaces/invoice';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json; charset=utf-8'
  })
};

@Injectable()
export class InvoiceService {
  invoices$: Observable<Invoice[]>;
  invoice$: Observable<Invoice>;
  constructor(
    private http: HttpClient
  ) { }
  getInvoices(): Observable<Invoice[]> {
    return this.invoices$ = this.http.get<Invoice[]>('invoices').publishLast().refCount();
  }
  getInvoice(id: number | string): Observable<Invoice> {
    return this.invoice$ = this.http.get<Invoice>(`invoices/${id}`).publishLast().refCount();
  }
  createInvoice(invoice: Invoice): Observable<Invoice> {
    return this.http.post<Invoice>('invoices', invoice, httpOptions);
  }
  deleteInvoice(id: number): Observable<{}> {
    return this.http.delete(`invoices/${id}`, httpOptions);
  }
  updateInvoice(invoice: Invoice, id: number | string): Observable<Invoice> {
    return this.http.put<Invoice>(`invoices/${id}`, invoice, httpOptions);
  }
}



// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { HttpHeaders } from '@angular/common/http';
//
// import { Observable } from 'rxjs/Observable';
// import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
// import { Subject } from 'rxjs/Subject';
// import 'rxjs/add/operator/publishReplay';
// import 'rxjs/add/operator/mergeAll';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/combineLatest';
//
// import { Invoice } from '../interfaces/invoice';
//
// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type':  'application/json; charset=utf-8'
//   })
// };
//
// @Injectable()
// export class InvoiceService {
//   invoice$: Observable<Invoice>;
//
//   invoicesSub$: Subject<Observable<Invoice[]>> = new Subject<Observable<Invoice[]>>();
//   _invoices$: ConnectableObservable<Invoice[]>;
//   invoices$: ConnectableObservable<Invoice[]>;
//
//   entities$: Observable<{}>;
//   ids$: Observable<number[]>;
//
//   constructor(
//     private http: HttpClient
//   ) {
//     this._invoices$ = this.invoicesSub$.mergeAll()
//       .publishReplay(1);
//     this._invoices$.connect();
//
//     this.entities$ = this._invoices$.map((invoices) => {
//       return invoices.reduce((accumInvoices, currentInvoice) => {
//         return {
//           ...accumInvoices,
//           [currentInvoice.id]: currentInvoice
//         };
//       }, {});
//     });
//     this.ids$ = this._invoices$.map((invoices) => {
//       return invoices.map((invoice) => invoice.id);
//     });
//     this.invoices$ = Observable.combineLatest(
//       this.entities$,
//       this.ids$
//     )
//       .map(([entities, ids]: [{}, number[]]) => {
//         return ids.map(id => entities[id]);
//       })
//       .publishReplay(1);
//     this.invoices$.connect();
//   }
//   getInvoices(): Observable<Invoice[]> {
//     this.invoicesSub$.next(this.http.get<Invoice[]>('invoices'));
//     return this.invoices$;
//   }
//   getInvoice(id: number | string): Observable<Invoice> {
//     return this.invoice$ = this.http.get<Invoice>(`invoices/${id}`).publishReplay(1);
//   }
//   createInvoice(invoice: Invoice): Observable<Invoice> {
//     return this.http.post<Invoice>('invoices', invoice, httpOptions);
//   }
//   deleteInvoice(id: number): Observable<{}> {
//     return this.http.delete(`invoices/${id}`, httpOptions);
//   }
//   updateInvoice(invoice: Invoice, id: number | string): Observable<Invoice> {
//     return this.http.put<Invoice>(`invoices/${id}`, invoice, httpOptions);
//   }
// }
