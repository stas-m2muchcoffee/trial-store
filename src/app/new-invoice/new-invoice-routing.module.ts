import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewInvoiceComponent } from './new-invoice.component';
import { CustomersResolverService } from '../shared/resolvers/customers-resolver.service';
import { ProductsResolverService } from '../shared/resolvers/products-resolver.service';
import { CanDeactivateNewInvoiceGuard } from '../shared/guards/can-deactivate-new-invoice.guard';

const routes: Routes = [
  { path: '',
    component: NewInvoiceComponent,
    resolve: {
      customers: CustomersResolverService,
      products: ProductsResolverService
    },
    canDeactivate: [CanDeactivateNewInvoiceGuard]
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
