import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvoiceItemsResolverService } from '../../core/resolvers/invoice-items-resolver.service';
import { CustomersResolverService } from '../../core/resolvers/customers-resolver.service';
import { ProductsResolverService } from '../../core/resolvers/products-resolver.service';
import { InvoiceResolverService } from '../../core/resolvers/invoice-resolver.service';
import { CanDeactivateEditInvoiceGuard } from '../../core/guards/can-deactivate-edit-invoice.guard';

import { EditInvoiceComponent } from './edit-invoice.component';

const routes: Routes = [
  { path: '',
    component: EditInvoiceComponent,
    resolve : {
      customers: CustomersResolverService,
      products: ProductsResolverService,
      invoiceItems: InvoiceItemsResolverService,
      invoice: InvoiceResolverService,
    },
    canDeactivate: [
      CanDeactivateEditInvoiceGuard
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditInvoiceRoutingModule { }
