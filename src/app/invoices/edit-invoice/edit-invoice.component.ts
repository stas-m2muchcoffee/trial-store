import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

import { Customer } from '../../core/interfaces/customer';
import { CustomerService } from '../../core/services/customer.service';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/interfaces/product';
import { InvoiceItem } from '../../core/interfaces/invoice-item';
import { InvoiceItemsService } from '../../core/services/invoice-items.service';
import { Invoice } from '../../core/interfaces/invoice';
import { InvoiceService } from '../../core/services/invoice.service';

@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.scss']
})
export class EditInvoiceComponent implements OnInit, OnDestroy {
  editInvoiceForm: FormGroup;
  customers$: Observable<Customer[]>;
  products$: Observable<Product[]>;
  invoiceItems$: Observable<InvoiceItem[]>;
  invoice$: Observable<Invoice>;
  total = 0;
  updateInvoice$: Subject<Invoice> = new Subject<Invoice>();
  addProductSubscription: Subscription;
  itemsChangeSubscription: Subscription;
  updateInvoiceSubscription: Subscription;

  invoice: Invoice;
  invoiceItems: InvoiceItem[];

  constructor(
    private customerService: CustomerService,
    private productService: ProductService,
    private invoiceItemsService: InvoiceItemsService,
    private invoiceService: InvoiceService,
    private router: Router
  ) {}

  get customer_id(): FormControl {
    return this.editInvoiceForm.get('customer_id') as FormControl;
  }
  get items(): FormArray {
    return this.editInvoiceForm.get('items') as FormArray;
  }
  get discount(): FormControl {
    return this.editInvoiceForm.get('discount') as FormControl;
  }
  get addProduct(): FormControl {
    return this.editInvoiceForm.get('addProduct') as FormControl;
  }

  ngOnInit() {
    this.customers$ = this.customerService.customers$;
    this.products$ = this.productService.products$;
    this.invoiceItems$ = this.invoiceItemsService.invoiceItems$;
    this.invoice$ = this.invoiceService.invoice$;

    this.invoice$.subscribe(invoice => this.invoice = invoice);
    this.createForm();
    this.invoiceItems$.subscribe(invoiceItems => {
      this.invoiceItems = invoiceItems;
      this.invoiceItems.forEach((invoiceItem) => {
        this.items.push(
          new FormGroup({
            product_id: new FormControl(invoiceItem.product_id),
            quantity: new FormControl(invoiceItem.quantity, [Validators.min(1), Validators.required])
          })
        );
      });
    });

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
      this.items.valueChanges.startWith(this.items.value),
      this.products$
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

    this.updateInvoiceSubscription = this.updateInvoice$
      .mergeMap((invoice) => this.invoiceService.updateInvoice(invoice, invoice.id))
      .subscribe((res) => {
        return this.router.navigate(['/invoices']);
      });
  }
  ngOnDestroy() {

  }
  createForm() {
    this.editInvoiceForm = new FormGroup({
      customer_id: new FormControl(this.invoice.customer_id, Validators.required),
      items: new FormArray([], [Validators.minLength(1), Validators.required]),
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
      this.total += (item.product.price * item.quantity) * (1 - this.invoice.discount / 100);
    });
  }
  deleteInvoice(i: number) {
    this.items.removeAt(i);
  }
  updateInvoice() {
    if (this.editInvoiceForm.valid) {
      this.updateInvoice$
        .next({...this.editInvoiceForm.value, id: this.invoice.id, discount: this.invoice.discount, total: this.total} as Invoice);
    }
  }
}
