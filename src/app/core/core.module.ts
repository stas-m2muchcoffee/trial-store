import { NgModule } from '@angular/core';
import { ToolbarModule } from '../toolbar/toolbar.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToolbarModule
  ],
  declarations: []
})
export class CoreModule { }
