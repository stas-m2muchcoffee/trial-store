import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { InvoicesComponent } from './invoices.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    InvoicesComponent
  ],
  exports: [
    InvoicesComponent
  ]
})
export class InvoicesModule { }
