import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

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
  price: number[] = [0];
  total: number = 0;
  //customerIdSubscription: Subscription;

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
  
  getTotal() {
    this.total = 0;
    this.price.forEach(price => {
      this.total += +(price*(1-this.newInvoiceForm.get('discount').value/100)).toFixed(2);
    });
  }
  
  addProduct() {
    const products = <FormArray>this.newInvoiceForm.controls['products'];
    products.push(this.formBuilder.group({
      productId: null,
      productQty: 0
    }));
    this.price.push(0);
  
    this.productsControl.controls.forEach((control, i) => {
      control.valueChanges.subscribe(invItem => {
        const selectedProduct = this.products.find(product => product.id === invItem.productId);
        this.price[i] = +(selectedProduct.price*control.value.productQty).toFixed(2);
        this.getTotal();
      })
    });
    this.productsControl.controls[this.productsControl.controls.length-1].valueChanges.subscribe(() => {
      if( this.productsControl.controls[this.productsControl.controls.length-1].value.productId != null ) {
        this.addProduct();
      }
    });
  }
  
  createForm() {
    this.newInvoiceForm = this.formBuilder.group({
      customerId: null,
      products: this.formBuilder.array([
        this.formBuilder.group({
          productId: null,
          productQty: 0
        })
      ]),
      discount: 0
    });
  
    this.productsControl.controls.forEach((control, i) => {
      control.valueChanges.subscribe(invItem => {
        const selectedProduct = this.products.find(product => product.id === invItem.productId);
        this.price[i] = +(selectedProduct.price*control.value.productQty).toFixed(2);
        this.getTotal();
      });
    });
    this.productsControl.controls[this.productsControl.controls.length-1].valueChanges.subscribe(() => {
      if( this.productsControl.controls[this.productsControl.controls.length-1].value.productId != null ) {
        this.addProduct();
      }
    });
  }
  
  createInvoice() {
    const invoice: Invoice = {
      items: this.newInvoiceForm.get('products').value,
      customer_id: this.newInvoiceForm.get('customerId').value,
      discount: this.newInvoiceForm.get('discount').value,
      total: this.total
    };
    this.invoiceService.createInvoice(invoice).subscribe(invoice => {
      this.newInvoiceForm.get('products').value.forEach(product => {
        if (product.productId !== null) {
          const invoiceItem = {
            invoice_id: invoice.id,
            product_id: product.productId,
            quantity: product.productQty
          };
          this.invoiceItemsService.createInvoiceItem(invoiceItem);
        }
      });
    });
  }
  
  ngOnDestroy() {
  
  }
}
