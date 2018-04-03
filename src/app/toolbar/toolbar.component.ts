import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';

import { InvoiceService } from '../core/services/invoice.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnDestroy {
  subscriptionNumInvoices: Subscription;
  numInvoices: {} = {};
  subscriptionUrl: Subscription;
  url: any;
  
  constructor(
    private invoiceService: InvoiceService,
    private activatedRoute: ActivatedRoute
  ) {
    this.subscriptionNumInvoices = this.invoiceService.getNumInvoices().subscribe(message => this.numInvoices = message);
    this.subscriptionUrl = this.activatedRoute.url.subscribe(url => {this.url = url; console.log(this.url)});
  }

  ngOnDestroy() {
    this.subscriptionNumInvoices.unsubscribe();
    //this.subscriptionUrl.unsubscribe();
  }

}
