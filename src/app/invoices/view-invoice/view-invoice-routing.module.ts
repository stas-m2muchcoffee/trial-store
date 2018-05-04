import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvoiceItemsResolverService } from '../../core/resolvers/invoice-items-resolver.service';
import { ProductsResolverService } from '../../core/resolvers/products-resolver.service';
import { CustomersResolverService } from '../../core/resolvers/customers-resolver.service';
import { InvoicesResolverService } from '../../core/resolvers/invoices-resolver.service';
import { InvoiceResolverService } from '../../core/resolvers/invoice-resolver.service';

import { ViewInvoiceComponent } from './view-invoice.component';

const routes: Routes = [
  {
    path: '',
    component: ViewInvoiceComponent,
    resolve: {
      invoiceItems: InvoiceItemsResolverService,
      customers: CustomersResolverService,
      invoices: InvoicesResolverService,
      invoice: InvoiceResolverService,
      products: ProductsResolverService,
    },
  },
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
