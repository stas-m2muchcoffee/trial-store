import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { ToolbarModule } from '../toolbar/toolbar.module';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { ProductService } from './services/product.service';
import { CustomerService } from './services/customer.service';
import { InvoiceService } from './services/invoice.service';
import { InvoiceItemsService } from './services/invoice-items.service';
import { httpInterceptorProviders } from './interceptors';
import { ModalService } from './services/modal.service';
import { ProductsResolverService } from './resolvers/products-resolver.service';
import { CustomersResolverService } from './resolvers/customers-resolver.service';
import { InvoicesResolverService } from './resolvers/invoices-resolver.service';
import { InvoiceItemsResolverService } from './resolvers/invoice-items-resolver.service';
import { CanDeactivateNewInvoiceGuard } from './guards/can-deactivate-new-invoice.guard';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  exports: [
    ToolbarModule
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
    CanDeactivateNewInvoiceGuard,
    ModalService
  ],
})
export class CoreModule {
  constructor(
    @Optional() @SkipSelf() parentModule: CoreModule
  ) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
