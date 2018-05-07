import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

import { SharedModule } from '../shared/shared.module';

import { InvoicesComponent } from './invoices.component';
import { InvoicesRoutingModule } from './invoices-routing.module';

@NgModule({
  imports: [
    SharedModule,
    InvoicesRoutingModule,
    MatDialogModule,
  ],
  declarations: [
    InvoicesComponent,
  ],
})
export class InvoicesModule { }
