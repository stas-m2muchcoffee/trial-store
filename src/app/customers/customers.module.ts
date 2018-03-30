import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CustomersComponent } from './customers.component';
import { CustomersRoutingModule } from './customers-routing.module';

@NgModule({
  imports: [
    SharedModule,
    CustomersRoutingModule
  ],
  declarations: [
    CustomersComponent
  ],
  exports: []
})
export class CustomersModule { }
