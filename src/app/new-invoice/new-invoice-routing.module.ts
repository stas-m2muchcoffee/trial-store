import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewInvoiceComponent } from './new-invoice.component';
import { CustomersResolverService } from '../shared/resolvers/customers-resolver.service';
import { ProductsResolverService } from '../shared/resolvers/products-resolver.service';



const routes: Routes = [
  { path: '',
    component: NewInvoiceComponent,
    resolve: {
      customers: CustomersResolverService,
      products: ProductsResolverService
    }
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
