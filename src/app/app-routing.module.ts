import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvoicesComponent } from './invoices/invoices.component';

const routes: Routes = [
  { path: '', redirectTo: '/invoices', pathMatch: 'full' },
  { path: 'invoices', component: InvoicesComponent },
  { path: 'customers', loadChildren: 'app/customers/customers.module#CustomersModule' },
  { path: 'products', loadChildren: 'app/products/products.module#ProductsModule' },
  { path: 'new-invoice', loadChildren: 'app/new-invoice/new-invoice.module#NewInvoiceModule' },
  { path: '**', loadChildren: 'app/page-not-found/page-not-found.module#PageNotFoundModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
