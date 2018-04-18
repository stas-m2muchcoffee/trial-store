import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewInvoiceComponent } from './view-invoice.component';
import { InvoiceItemsResolverService } from '../../core/resolvers/invoice-items-resolver.service';

const routes: Routes = [
  { path: '',
    component: ViewInvoiceComponent,
    resolve: {
      invoiceItems: InvoiceItemsResolverService
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ViewInvoiceRoutingModule { }
