import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditInvoiceComponent } from './edit-invoice.component';
import { InvoiceItemsResolverService } from '../../core/resolvers/invoice-items-resolver.service';
import { CustomersResolverService } from '../../core/resolvers/customers-resolver.service';
import { ProductsResolverService } from '../../core/resolvers/products-resolver.service';
import { InvoiceResolverService } from '../../core/resolvers/invoice-resolver.service';

const routes: Routes = [
  { path: '',
    component: EditInvoiceComponent,
    resolve : {
      customers: CustomersResolverService,
      products: ProductsResolverService,
      invoiceItems: InvoiceItemsResolverService,
      invoice: InvoiceResolverService,
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditInvoiceRoutingModule { }
