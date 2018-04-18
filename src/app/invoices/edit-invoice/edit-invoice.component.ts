import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import 'rxjs/add/operator/combineLatest';

import { CustomerService } from '../../core/services/customer.service';
import { InvoiceItemsService } from '../../core/services/invoice-items.service';
import { ProductService } from '../../core/services/product.service';
import { InvoiceService } from '../../core/services/invoice.service';
import { Customer } from '../../core/interfaces/customer';
import { InvoiceItem } from '../../core/interfaces/invoice-item';
import { Product } from '../../core/interfaces/product';

@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.scss']
})
export class EditInvoiceComponent implements OnInit {
  editInvoiceForm: FormGroup;
  customers$: Observable<Customer[]>;
  invoiceItems$: Observable<InvoiceItem[]>;
  products$: Observable<Product[]>;

  total: number = 0;

  constructor(
    private customerService: CustomerService,
    private invoiceItemsService: InvoiceItemsService,
    private productService: ProductService,
    private invoiceService: InvoiceService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.createForm();
    this.customers$ = this.customerService.customers$;
    this.products$ = this.productService.products$;
    this.invoiceItems$ = Observable.combineLatest(
      this.invoiceItemsService.invoiceItems$,
      this.invoiceItemsService.products$
    )
    .map(([invoiceItems, products]: [InvoiceItem[], Product[]]) => {
      return invoiceItems.map((invoiceItem) => {
        invoiceItem.product = products.find((product) => product.id === invoiceItem.product_id);
        return invoiceItem;
      })
    });

    this.invoiceItemsService.customer$.subscribe(customer => this.editInvoiceForm.controls['customerId'].setValue(customer.id));

    this.invoiceItemsService.invoice$.subscribe(invoice => {
      this.editInvoiceForm.controls['invoiceId'].setValue(invoice.id);
      this.editInvoiceForm.controls['discount'].setValue(invoice.discount);
    });

    this.invoiceItems$.subscribe(invoiceItems => {
      const products = <FormArray>this.editInvoiceForm.controls['products'];
      invoiceItems.map(invoiceItem => {
        products.push(this.formBuilder.group({
          productId: invoiceItem.product.id,
          productQty: invoiceItem.quantity,
          productPrice: invoiceItem.product.price
        }));
        this.total += invoiceItem.product.price*invoiceItem.quantity;
        this.editInvoiceForm.controls['total'].setValue((this.total*(1-(this.editInvoiceForm.controls['discount'].value)/100)).toFixed(2));
      });
      products.push(this.formBuilder.group({
        productId: null,
        productQty: 0,
        productPrice: 0
      }));
    });

    //this.productsControl.controls.forEach(() => console.log(111));

    //this.productsControl.controls.forEach(
    //  control => {
    //    control.valueChanges.subscribe(
    //      () => {
    //        console.log(this.productsControl.controls.indexOf(control))
    //      }
    //    )
    //  }
    //)
  }

  get productsControl(): FormArray {
    return this.editInvoiceForm.get('products') as FormArray;
  };

  createForm() {
    this.editInvoiceForm = this.formBuilder.group({
      invoiceId: null,
      customerId: null,
      products: this.formBuilder.array([]),
      total: null,
      discount: null
    });
  }

  //put() {
  //  //подписываемся на изменение кастомера
  //  this.editInvoiceForm.get('customerId').valueChanges.subscribe(customerId => {
  //
  //    const invoice: Invoice = {
  //      id: this.editInvoiceForm.get('invoiceId').value,
  //      customer_id: customerId,
  //      discount: this.editInvoiceForm.get('discount').value,
  //      total: this.editInvoiceForm.get('total').value
  //    };
  //
  //    console.log(invoice);
  //
  //    this.invoiceService.updateInvoice(invoice);
  //  });
  //}
}
