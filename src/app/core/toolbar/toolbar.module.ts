import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material';
import { MatChipsModule } from '@angular/material/chips';

import { SharedModule } from '../../shared/shared.module';
import { AppRoutingModule } from '../../app-routing.module';

import { ToolbarComponent } from './toolbar.component';

@NgModule({
  imports: [
    SharedModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatChipsModule,
    AppRoutingModule
  ],
  declarations: [
    ToolbarComponent
  ],
  exports: [
    ToolbarComponent
  ],
})
export class ToolbarModule { }
