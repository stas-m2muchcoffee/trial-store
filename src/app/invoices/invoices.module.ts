import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

import { SharedModule } from '../shared/shared.module';
import { InvoicesComponent } from './invoices.component';
import { InvoicesRoutingModule } from './invoices-routing.module';

@NgModule({
  imports: [
    SharedModule,
    MatTableModule,
    MatButtonModule,
    InvoicesRoutingModule
  ],
  declarations: [
    InvoicesComponent
  ],
  exports: [
    InvoicesComponent
  ]
})
export class InvoicesModule { }
