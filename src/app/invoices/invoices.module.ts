import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { InvoicesComponent } from './invoices.component';
import { InvoicesRoutingModule } from './invoices-routing.module';

@NgModule({
  imports: [
    SharedModule,
    InvoicesRoutingModule,
  ],
  declarations: [
    InvoicesComponent,
  ],
})
export class InvoicesModule { }
