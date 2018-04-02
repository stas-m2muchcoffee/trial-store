import { NgModule, Optional, SkipSelf } from '@angular/core';
import { ToolbarModule } from '../toolbar/toolbar.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { InvoicesModule } from '../invoices/invoices.module';

@NgModule({
  imports: [],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToolbarModule,
    InvoicesModule
  ],
  declarations: []
})
export class CoreModule {
  constructor(
    @Optional() @SkipSelf() parentModule: CoreModule
  ) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
