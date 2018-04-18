import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomersResolverService } from '../../core/resolvers/customers-resolver.service';
import { ProductsResolverService } from '../../core/resolvers/products-resolver.service';
import { CanDeactivateNewInvoiceGuard } from '../../core/guards/can-deactivate-new-invoice.guard';

import { NewInvoiceComponent } from './new-invoice.component';

const routes: Routes = [
  {
    path: '',
    component: NewInvoiceComponent,
    resolve: {
      customers: CustomersResolverService,
      products: ProductsResolverService
    },
    canDeactivate: [
      CanDeactivateNewInvoiceGuard
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
export class NewInvoiceRoutingModule { }
