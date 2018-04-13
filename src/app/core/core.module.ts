import { NgModule, Optional, SkipSelf } from '@angular/core';
import { ToolbarModule } from '../toolbar/toolbar.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { ProductService } from './services/product.service';
import { CustomerService } from './services/customer.service';
import { InvoiceService } from './services/invoice.service';
import { InvoiceItemsService } from './services/invoice-items.service';
import { httpInterceptorProviders } from './interceptors';
import { ProductsResolverService } from '../shared/resolvers/products-resolver.service';
import { CustomersResolverService } from '../shared/resolvers/customers-resolver.service';
import { InvoicesResolverService } from '../shared/resolvers/invoices-resolver.service';
import { InvoiceItemsResolverService } from '../shared/resolvers/invoice-items-resolver.service';
import { CanDeactivateNewInvoiceGuard } from '../shared/guards/can-deactivate-new-invoice.guard';

@NgModule({
  imports: [],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToolbarModule,
    HttpClientModule
  ],
  providers: [
    ProductService,
    CustomerService,
    InvoiceService,
    InvoiceItemsService,
    ProductsResolverService,
    CustomersResolverService,
    InvoicesResolverService,
    InvoiceItemsResolverService,
    httpInterceptorProviders,
    CanDeactivateNewInvoiceGuard
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
