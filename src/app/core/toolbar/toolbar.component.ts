import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { InvoiceService } from '../services/invoice.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  countInvoices$: Observable<number>;

  constructor(
    private invoiceService: InvoiceService,
  ) {}

  ngOnInit() {
    this.countInvoices$ = this.invoiceService.invoices$
    .map((invoices) => invoices.length);
  }
}
