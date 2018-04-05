import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvoicesComponent } from './invoices.component';
import { InvoicesResolverService } from '../shared/resolvers/invoices-resolver.service';
import { CustomersResolverService } from '../shared/resolvers/customers-resolver.service';

const routes: Routes = [
  { path: '',
    component: InvoicesComponent,
    resolve: {
      customers: CustomersResolverService,
      invoices: InvoicesResolverService
    },
  },
  { path: 'view/:id',
    loadChildren: 'app/invoices/view-invoice/view-invoice.module#ViewInvoiceModule'
  },
  { path: 'edit/:id',
    loadChildren: 'app/invoices/edit-invoice/edit-invoice.module#EditInvoiceModule'
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
export class InvoicesRoutingModule { }
