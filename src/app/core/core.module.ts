import { NgModule, Optional, SkipSelf } from '@angular/core';
import { ToolbarModule } from '../toolbar/toolbar.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { InvoicesModule } from '../invoices/invoices.module';
import { ProductService } from './services/product.service';

@NgModule({
  imports: [],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToolbarModule,
    InvoicesModule,
    HttpClientModule
  ],
  providers: [
    ProductService
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
