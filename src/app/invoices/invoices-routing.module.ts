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
      invoices: InvoicesResolverService,
    },
    children: [
      {
        path: '',
        loadChildren: 'app/invoices/invoice-list/invoice-list.module#InvoiceListModule',
      },
      {
        path: 'create',
        loadChildren: 'app/invoices/invoice/invoice.module#InvoiceModule',
        data: {type: 'create'},
      },
      {
        path: 'edit/:id',
        loadChildren: 'app/invoices/invoice/invoice.module#InvoiceModule',
        data: {type: 'edit'},
      },
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
export class InvoicesRoutingModule { }
