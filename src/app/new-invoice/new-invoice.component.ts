import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { CustomerService } from '../core/services/customer.service';
import { ProductService } from '../core/services/product.service';
import { Customer } from '../customers/customer';
import { Product } from '../products/product';

@Component({
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.scss']
})
export class NewInvoiceComponent implements OnInit {
  newInvoiceForm: FormGroup;
  customers$: Observable<Customer[]>;
  products$: Observable<Product[]>;
  price: number[];

  constructor(
    private customerService: CustomerService,
    private productService: ProductService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.createForm();
    this.customers$ = this.customerService.customers$;
    this.products$ = this.productService.products$;
    
    this.newInvoiceForm.controls['customerId'].valueChanges.subscribe(customer => {
      console.log(customer);
    });
    
    this.productsControl.controls.forEach(control => control.valueChanges.subscribe(console.log))
  }
  
  get productsControl(): FormArray {
    return this.newInvoiceForm.get('products') as FormArray;
  }
  
  createForm() {
    this.newInvoiceForm = this.formBuilder.group({
      customerId: null,
      products: this.formBuilder.array([
        this.formBuilder.group({
          productId: null,
          productQty: null,
          productPrice: null
        })
      ]),
      discount: null
    })
  }
}
