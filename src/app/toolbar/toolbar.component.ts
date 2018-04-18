import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { InvoiceService } from '../core/services/invoice.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  countInvoices$: Observable<number>;
  constructor(
    private invoiceService: InvoiceService
  ) {}
  ngOnInit() {
    this.invoiceService.getInvoices();
    this.countInvoices$ = this.invoiceService.invoices$.map(res => res.length);
  }
}
