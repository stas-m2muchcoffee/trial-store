import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

import { SharedModule } from '../shared/shared.module';

import { ToolbarComponent } from './toolbar.component';

@NgModule({
  imports: [
    SharedModule,
    MatToolbarModule
  ],
  declarations: [
    ToolbarComponent
  ],
  exports: [
    SharedModule
  ]
})
export class ToolbarModule { }
