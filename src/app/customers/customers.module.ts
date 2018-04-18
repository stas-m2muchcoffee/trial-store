import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

import { SharedModule } from '../shared/shared.module';
import { CustomersComponent } from './customers.component';
import { CustomersRoutingModule } from './customers-routing.module';

@NgModule({
  imports: [
    SharedModule,
    CustomersRoutingModule,
    MatTableModule
  ],
  declarations: [
    CustomersComponent
  ],
})
export class CustomersModule { }
