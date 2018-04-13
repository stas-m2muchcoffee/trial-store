import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

import { CustomerService } from '../core/services/customer.service';
import { InvoiceService } from '../core/services/invoice.service';
import { ProductService } from '../core/services/product.service';
import { InvoiceItemsService } from '../core/services/invoice-items.service';
import { Customer } from '../customers/customer';
import { Product } from '../products/product';
import { Invoice } from '../invoices/invoice';

@Component({
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.scss']
})
export class NewInvoiceComponent implements OnInit, OnDestroy {
  newInvoiceForm: FormGroup;
  customers$: Observable<Customer[]>;
  products$: Observable<Product[]>;
  products: Product[];
  total: number = 0;

  constructor(
    private customerService: CustomerService,
    private invoiceService: InvoiceService,
    private productService: ProductService,
    private invoiceItemsService: InvoiceItemsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.createForm();
    this.customers$ = this.customerService.customers$;
    this.products$ = this.productService.products$;
    this.products$.subscribe(products => this.products = products);
    
    this.newInvoiceForm.controls['discount'].valueChanges.subscribe(() => {
      this.getTotal();
    });
  }
  
  get productsControl(): FormArray {
    return this.newInvoiceForm.get('products') as FormArray;
  }
  
  createForm() {
    this.newInvoiceForm = this.formBuilder.group({
      customerId: [null, Validators.required],
      products: this.formBuilder.array([]),
      discount: [0, Validators.max(50)]
    });
    this.addProduct();
  }
  
  addProduct() {
    const products = <FormArray>this.newInvoiceForm.controls['products'];
    products.push(this.formBuilder.group({
      productId: null,
      productQty: [0, Validators.min(0)],
      productPrice: 0
    }));
    
    this.productsControl.controls.forEach((control) => {
      control.valueChanges.subscribe(invItem => {
        const selectedProduct = this.products.find(product => product.id === invItem.productId);
        if(selectedProduct) {
          control.value.productPrice = (selectedProduct.price*control.value.productQty).toFixed(2);
          this.getTotal();
        }
      })
    });
    this.productsControl.controls[this.productsControl.controls.length-1].valueChanges.subscribe(() => {
      if( this.productsControl.controls[this.productsControl.controls.length-1].value.productId !== null ) {
        this.addProduct();
      }
    });
  }
  
  getTotal() {
    this.total = 0;
    this.productsControl.controls.forEach((control) => {
      this.total += control.value.productPrice*(1-this.newInvoiceForm.get('discount').value/100);
    });
  }
  
  deleteInvoice(i: number) {
    this.productsControl.removeAt(i);
    this.getTotal();
  }
  
  createInvoice() {
    if (this.newInvoiceForm.valid) {
    const invoice: Invoice = {
        items: [],
        customer_id: this.newInvoiceForm.get('customerId').value,
        discount: this.newInvoiceForm.get('discount').value,
        total: this.total
      };
      this.invoiceService.createInvoice(invoice).subscribe(invoice => {
        this.createInvoiceItem(invoice.id);
      });
    }
  }
  
  createInvoiceItem(id: number) {
    this.newInvoiceForm.get('products').value.forEach(product => {
      if (product.productId !== null) {
        const invoiceItem = {
          invoice_id: id,
          product_id: product.productId,
          quantity: product.productQty
        };
        this.invoiceItemsService.createInvoiceItem(invoiceItem, id).subscribe();
      }
    });
    alert('Invoice created!');
    this.createForm();
    this.total = 0;
  }
  
  canDeactivate(): Observable<boolean> | boolean {
    if (this.newInvoiceForm.dirty) {
      return confirm('You did not create an invoice. Leave the page?');
    } else {
      return true;
    }
  }
  
  ngOnDestroy() {
  
  }
}
