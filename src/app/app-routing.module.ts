import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvoicesResolverService } from './core/resolvers/invoices-resolver.service';

const routes: Routes = [
  {
    path: '',
    resolve: {
      invoices: InvoicesResolverService
    },
    children: [
      {
        path: '',
        redirectTo: '/invoices',
        pathMatch: 'full',
      },
      {
        path: 'invoices',
        loadChildren: 'app/invoices/invoices.module#InvoicesModule',
      },
      {
        path: 'customers',
        loadChildren: 'app/customers/customers.module#CustomersModule',
      },
      {
        path: 'products',
        loadChildren: 'app/products/products.module#ProductsModule',
      },
      {
        path: '**',
        loadChildren: 'app/page-not-found/page-not-found.module#PageNotFoundModule',
      },
    ],
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule {}
