import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

import { SharedModule } from '../shared/shared.module';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';

@NgModule({
  imports: [
    SharedModule,
    ProductsRoutingModule,
    MatTableModule
  ],
  declarations: [
    ProductsComponent
  ],
  exports: [
  
  ]
})
export class ProductsModule { }
