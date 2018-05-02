import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/shareReplay';

import { CustomerService } from '../../core/services/customer.service';
import { InvoiceService } from '../../core/services/invoice.service';
import { ProductService } from '../../core/services/product.service';
import { InvoiceItemsService } from '../../core/services/invoice-items.service';
import { ModalService } from '../../core/services/modal.service';
import { Customer } from '../../core/interfaces/customer';
import { Product } from '../../core/interfaces/product';
import { InvoiceItem } from '../../core/interfaces/invoice-item';
import { Invoice } from '../../core/interfaces/invoice';

@Component({
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.scss']
})
export class NewInvoiceComponent implements OnInit, OnDestroy {
  newInvoiceForm: FormGroup;
  customers$: Observable<Customer[]>;
  products$: Observable<Product[]>;
  addProductSubscription: Subscription;
  itemsChangeSubscription: Subscription;
  createInvoiceSubscription: Subscription;
  createInvoice$: Subject<Invoice> = new Subject<Invoice>();
  total = 0;

  constructor(
    private customerService: CustomerService,
    private invoiceService: InvoiceService,
    private productService: ProductService,
    private invoiceItemsService: InvoiceItemsService,
    private dialog: MatDialog,
    private modalService: ModalService,
    private router: Router
  ) {}

  get customer_id(): FormControl {
    return this.newInvoiceForm.get('customer_id') as FormControl;
  }
  get items(): FormArray {
    return this.newInvoiceForm.get('items') as FormArray;
  }
  get discount(): FormControl {
    return this.newInvoiceForm.get('discount') as FormControl;
  }
  get addProduct(): FormControl {
    return this.newInvoiceForm.get('addProduct') as FormControl;
  }

  ngOnInit() {
    this.createForm();

    this.customers$ = this.customerService.customers$;
    this.products$ = this.productService.products$;

    this.addProductSubscription = Observable.combineLatest(
      this.products$,
      this.addProduct.valueChanges
    )
    .map(([products, productId]: [Product[], number]) => {
      return products.find((product) => product.id === productId);
    })
    .subscribe(product => {
      this.addItem(product);
    });

    this.itemsChangeSubscription = Observable.combineLatest(
      this.items.valueChanges,
      this.products$,
      this.discount.valueChanges.startWith(this.discount.value)
    )
      .map(([items, products]: [InvoiceItem[], Product[]]) => {
        return items.map((item) => {
          item.product = products.find((product) => product.id === item.product_id);
          return item;
        });
      })
      .subscribe(items => {
        this.getTotal(items);
      });

    this.createInvoiceSubscription = this.createInvoice$.mergeMap((invoice) => this.invoiceService.createInvoice(invoice))
      .subscribe(() => {
        return this.router.navigate(['/invoices']);
      });
  }
  ngOnDestroy() {
    this.addProductSubscription.unsubscribe();
    this.itemsChangeSubscription.unsubscribe();
    this.createInvoiceSubscription.unsubscribe();
  }
  createForm() {
    this.newInvoiceForm = new FormGroup({
      customer_id: new FormControl(null, Validators.required),
      items: new FormArray([], [Validators.minLength(1), Validators.required]),
      discount: new FormControl(0, [Validators.min(0), Validators.max(50), Validators.required]),
      addProduct: new FormControl(null)
    });
  }
  addItem(product: Product) {
    this.items.push(new FormGroup({
      product_id: new FormControl(product.id),
      quantity: new FormControl(1, [Validators.min(1), Validators.required]),
    }));
  }
  getTotal(items) {
    this.total = 0;
    items.forEach((item) => {
      this.total += (item.product.price * item.quantity) * (1 - this.discount.value / 100);
    });
  }
  deleteInvoice(i: number) {
    this.items.removeAt(i);
  }
  createInvoice() {
    if (this.newInvoiceForm.valid) {
      this.createInvoice$.next({...this.newInvoiceForm.value, total: this.total} as Invoice);
    }
  }
  canDeactivate(): Observable<boolean> | boolean {
    if (this.newInvoiceForm.dirty) {
      return this.modalService.confirmModal('Your changes have not been saved. Do you want to leave?', true);
    } else {
      return true;
    }
  }
}
