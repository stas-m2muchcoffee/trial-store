import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {CustomersResolverService} from '../../core/resolvers/customers-resolver.service';
import {ProductsResolverService} from '../../core/resolvers/products-resolver.service';
import {InvoiceGuard} from '../../core/guards/invoice.guard';

import {InvoiceComponent} from './invoice.component';
import {InvoiceResolverService} from '../../core/resolvers/invoice-resolver.service';
import {InvoiceItemsResolverService} from '../../core/resolvers/invoice-items-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: InvoiceComponent,
    resolve: {
      customers: CustomersResolverService,
      products: ProductsResolverService,
      invoice: InvoiceResolverService,
      invoiceItems: InvoiceItemsResolverService,
    },
    canDeactivate: [
      InvoiceGuard
    ]
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
export class InvoiceRoutingModule {
}
