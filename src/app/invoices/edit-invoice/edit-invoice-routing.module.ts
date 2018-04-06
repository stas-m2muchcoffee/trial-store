import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditInvoiceComponent } from './edit-invoice.component';
import { InvoiceItemsResolverService } from '../../shared/resolvers/invoice-items-resolver.service';
import { CustomersResolverService } from '../../shared/resolvers/customers-resolver.service';
import { InvoicesResolverService } from '../../shared/resolvers/invoices-resolver.service';
import { ProductsResolverService } from '../../shared/resolvers/products-resolver.service';

const routes: Routes = [
  { path: '',
    component: EditInvoiceComponent,
    resolve : {
      invoiceItems: InvoiceItemsResolverService,
      customers: CustomersResolverService,
      invoices: InvoicesResolverService,
      products: ProductsResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditInvoiceRoutingModule { }
