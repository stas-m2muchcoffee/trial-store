import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { CustomerService } from '../core/services/customer.service';
import { InvoiceService } from '../core/services/invoice.service';
import { ProductService } from '../core/services/product.service';
import { InvoiceItemsService } from '../core/services/invoice-items.service';
import { Customer } from '../customers/customer';
import { Product } from '../products/product';
import { Invoice } from '../invoices/invoice';
import { ModalWindowNewInvoiceComponent } from './modal-window-new-invoice/modal-window-new-invoice.component';
import { ModalService } from '../core/services/modal.service';

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
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private modalService: ModalService
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
  
  createForm(): void {
    this.newInvoiceForm = this.formBuilder.group({
      customerId: [null, Validators.required],
      products: this.formBuilder.array([], Validators.minLength(2)),
      discount: [0, [Validators.max(50), Validators.min(0)]]
    });
    this.addProduct();
  }
  
  addProduct(): void {
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
  
  getTotal(): void {
    this.total = 0;
    this.productsControl.controls.forEach((control) => {
      this.total += control.value.productPrice*(1-this.newInvoiceForm.get('discount').value/100);
    });
  }
  
  deleteInvoice(i: number): void {
    this.productsControl.removeAt(i);
    this.getTotal();
  }
  
  createInvoice(): void {
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
  
  createInvoiceItem(id: number): void {
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
    this.createForm();
    this.total = 0;
  }
  
  canDeactivate(): Observable<boolean> | boolean {
    if (this.newInvoiceForm.dirty) {
      this.openModal();
      return this.modalService.navigateAwaySelection$;
    } else {
      return true;
    }
  }
  openModal(): void {
    this.dialog.open(ModalWindowNewInvoiceComponent, {
      width: '250px',
    });
  }
  
  ngOnDestroy() {
  
  }
}
