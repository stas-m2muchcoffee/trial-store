import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomersComponent } from './customers.component';
import { CustomersResolverService } from '../core/resolvers/customers-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: CustomersComponent,
    resolve: { customers: CustomersResolverService }
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
export class CustomersRoutingModule { }
