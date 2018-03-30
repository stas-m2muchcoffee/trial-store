import { NgModule } from '@angular/core';

//Angular material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

import { AppRoutingModule } from '../app-routing.module';

import { SharedModule } from '../shared/shared.module';
import { ToolbarComponent } from './toolbar.component';

@NgModule({
  imports: [
    SharedModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    AppRoutingModule
  ],
  declarations: [
    ToolbarComponent
  ],
  exports: [
    ToolbarComponent
  ]
})
export class ToolbarModule { }
