import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvoicesComponent } from './invoices.component';
import { CustomersResolverService } from '../core/resolvers/customers-resolver.service';
import { InvoicesResolverService } from '../core/resolvers/invoices-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: InvoicesComponent,
    resolve: {
      customers: CustomersResolverService,
      invoices: InvoicesResolverService
    },
  },
  {
    path: 'new',
    loadChildren: 'app/invoices/new-invoice/new-invoice.module#NewInvoiceModule',
    data: {type: 'new'},
  },
  {
    path: 'edit/:id',
    loadChildren: 'app/invoices/new-invoice/new-invoice.module#NewInvoiceModule',
    data: {type: 'edit'},
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
export class InvoicesRoutingModule { }
