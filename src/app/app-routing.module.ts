import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsResolverService } from './shared/resolvers/products-resolver.service';
import { CustomersResolverService } from './shared/resolvers/customers-resolver.service';
import { InvoicesResolverService } from './shared/resolvers/invoices-resolver.service';

const routes: Routes = [
  { path: '',
    redirectTo: '/invoices',
    pathMatch: 'full'
  },
  { path: 'invoices',
    loadChildren: 'app/invoices/invoices.module#InvoicesModule'
  },
  { path: 'customers',
    loadChildren: 'app/customers/customers.module#CustomersModule'
  },
  { path: 'products',
    loadChildren: 'app/products/products.module#ProductsModule',
  },
  { path: 'new-invoice',
    loadChildren: 'app/new-invoice/new-invoice.module#NewInvoiceModule'
  },
  { path: '**',
    loadChildren: 'app/page-not-found/page-not-found.module#PageNotFoundModule'
  },
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
