import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';

@NgModule({
  imports: [
    SharedModule,
    ProductsRoutingModule
  ],
  declarations: [
    ProductsComponent
  ],
  exports: []
})
export class ProductsModule { }
