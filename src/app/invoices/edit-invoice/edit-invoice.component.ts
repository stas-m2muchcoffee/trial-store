import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import 'rxjs/add/operator/combineLatest';

import { Customer } from '../../customers/customer';
import { CustomerService } from '../../core/services/customer.service';
import { InvoiceItemsService } from '../../core/services/invoice-items.service';
import { InvoiceItem } from '../invoice-item';
import { Product } from '../../products/product';
import { ProductService } from '../../core/services/product.service';

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
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.createForm();
    this.editInvoiceForm.controls['products'].valueChanges.subscribe(console.log);
    
    this.customers$ = this.customerService.customers$;
    this.invoiceItemsService.customer$.subscribe(customer => this.editInvoiceForm.controls['customerName'].setValue(customer.name));
    this.invoiceItemsService.invoice$.subscribe(invoice => {
      this.editInvoiceForm.controls['invoiceId'].setValue('Invoice #'+invoice.id);
      this.editInvoiceForm.controls['discount'].setValue(invoice.discount);
    });
    
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
  
    this.products$ = this.productService.products$;
    this.invoiceItems$.subscribe(invoiceItems => {
      const products = <FormArray>this.editInvoiceForm.controls['products'];
      invoiceItems.map(invoiceItem => {
        products.push(this.formBuilder.group({
          productName: invoiceItem.product.name,
          productQty: invoiceItem.quantity,
          productPrice: '$'+(invoiceItem.product.price*invoiceItem.quantity).toFixed(2)
        }));
        this.total += (invoiceItem.product.price*invoiceItem.quantity);
        this.editInvoiceForm.controls['total'].setValue((this.total*(1-(this.editInvoiceForm.controls['discount'].value)/100)).toFixed(2));
      });
      products.push(this.formBuilder.group({
        productName: "",
        productQty: 0,
        productPrice: '$0'
      }));
    });
  }
  
  get products(): FormArray {
    return this.editInvoiceForm.get('products') as FormArray;
  };
  
  createForm() {
    this.editInvoiceForm = this.formBuilder.group({
      invoiceId: '',
      customerName: '',
      products: this.formBuilder.array([]),
      total: '',
      discount: ''
    });
  }

}
