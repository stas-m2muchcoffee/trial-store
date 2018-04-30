import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';

import { MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    SharedModule,
    ProductsRoutingModule,
    MatButtonModule
  ],
  declarations: [
    ProductsComponent
  ],
})
export class ProductsModule { }
