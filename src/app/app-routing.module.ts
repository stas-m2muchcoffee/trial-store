import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { InvoicesComponent } from './invoices/invoices.component';
//import { CustomersComponent } from './customers/customers.component';
//import { ProductsComponent } from './products/products.component';
//import { NewInvoiceComponent } from './new-invoice/new-invoice.component';


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
