import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from './products.component';
import { ProductsResolverService } from '../shared/resolvers/products-resolver.service';



const routes: Routes = [
  { path: '',
    component: ProductsComponent,
    resolve: { products: ProductsResolverService }
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
export class ProductsRoutingModule { }
