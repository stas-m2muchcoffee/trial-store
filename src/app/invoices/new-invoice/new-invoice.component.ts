import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';

import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/switchMapTo';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import {CustomerService} from '../../core/services/customer.service';
import {InvoiceService} from '../../core/services/invoice.service';
import {ProductService} from '../../core/services/product.service';
import {InvoiceItemsService} from '../../core/services/invoice-items.service';
import {ModalService} from '../../core/services/modal.service';
import {Customer} from '../../core/interfaces/customer';
import {Product} from '../../core/interfaces/product';
import {InvoiceItem} from '../../core/interfaces/invoice-item';
import {Invoice} from '../../core/interfaces/invoice';

@Component({
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.scss']
})
export class NewInvoiceComponent implements OnInit, OnDestroy {
  invoiceForm: FormGroup;
  customers$: Observable<Customer[]>;
  products$: Observable<Product[]>;
  addInvoiceItemSubscription: Subscription;
  updateInvoiceSubscription: Subscription;
  setTotalSubscription: Subscription;
  createInvoiceSubscription: Subscription;
  addInvoiceItem = new FormControl(null);
  createInvoice$: Subject<Invoice>;
  flag = false;
  invoice: Invoice;
  invoiceItems: InvoiceItem[];

  constructor(
    private customerService: CustomerService,
    private invoiceService: InvoiceService,
    private productService: ProductService,
    private invoiceItemsService: InvoiceItemsService,
    private dialog: MatDialog,
    private modalService: ModalService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  get customer_id(): FormControl {
    return this.invoiceForm.get('customer_id') as FormControl;
  }

  get items(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }

  get discount(): FormControl {
    return this.invoiceForm.get('discount') as FormControl;
  }

  get total(): FormControl {
    return this.invoiceForm.get('total') as FormControl;
  }

  get isEdit() {
    return this.route.snapshot.data.type === 'edit';
  }

  ngOnInit() {
    this.createInvoice$ = new Subject<Invoice>();

    this.invoice = this.route.snapshot.data.invoice || null;
    this.invoiceItems = this.route.snapshot.data.invoiceItems || [];

    this.createForm();

    this.customers$ = this.customerService.customers$;
    this.products$ = this.productService.products$;

    this.setTotalSubscription = Observable.combineLatest(
      this.items.valueChanges.startWith(this.items.value),
      this.discount.valueChanges.startWith(this.discount.value),
    )
    .map(([items, discount]: [InvoiceItem[], number]) => {
      const total = items.reduce((acc, item) => acc + item.price, 0);
      return total * (1 - discount / 100);
    })
    .subscribe(total => {
      this.total.setValue(total);
    });

    this.createInvoiceSubscription = this.createInvoice$
    .mergeMap((invoice) => this.invoiceService.createInvoice(invoice))
    .subscribe(() => {
      this.flag = true;
      return this.router.navigate(['/invoices']);
    });

    this.addInvoiceItemSubscription = this.addInvoiceItem.valueChanges
    .switchMap(product_id => {
      if (this.isEdit) {
        return this.invoiceItemsService.createInvoiceItem({
          invoice_id: this.invoice.id,
          product_id: product_id,
          quantity: 1,
        })
        .take(1);
      }
      return Observable.of({product_id} as InvoiceItem);
    })
    .subscribe(
      (invoiceItem) => {
        this.addItem(invoiceItem);
        this.addInvoiceItem.reset(null, {emitEvent: false});
      }
    );

    this.updateInvoiceSubscription = Observable.merge(
      this.customer_id.valueChanges,
      this.total.valueChanges,
      this.discount.valueChanges
    )
    .filter(() => this.isEdit)
    .debounceTime(500)
    .skip(1)
    .distinctUntilChanged()
    .subscribe(() => {
      this.invoiceService.updateInvoice(this.invoiceForm.value);
    });
  }

  ngOnDestroy() {
    this.addInvoiceItemSubscription.unsubscribe();
    this.setTotalSubscription.unsubscribe();
    this.createInvoiceSubscription.unsubscribe();
  }

  createForm() {
    this.invoiceForm = new FormGroup({
      id: new FormControl(null),
      customer_id: new FormControl(null, Validators.required),
      items: new FormArray([], [Validators.minLength(1), Validators.required]),
      discount: new FormControl(0, [Validators.min(0), Validators.max(50), Validators.required]),
      total: new FormControl(0),
    });
    if (this.isEdit) {
      this.invoiceForm.reset(this.invoice);
      this.invoiceItems.map((invoiceItem) => {
        this.addItem(invoiceItem);
      });
    }
  }

  addItem(invoiceItem: InvoiceItem) {
    this.items.push(
      new FormGroup({
        id: new FormControl(invoiceItem.id),
        invoice_id: new FormControl(invoiceItem.invoice_id),
        product_id: new FormControl(invoiceItem.product_id),
        quantity: new FormControl(invoiceItem.quantity || 1, [Validators.min(1), Validators.required]),
        price: new FormControl(0),
      })
    );
  }

  createInvoice() {
    if (this.invoiceForm.valid) {
      this.createInvoice$.next({...this.invoiceForm.value} as Invoice);
    }
  }

  deleteItem(i: number) {
    this.items.removeAt(i);
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.invoiceForm.dirty && !this.flag) {
      return this.modalService.confirmModal('Your changes have not been saved. Do you want to leave?');
    } else {
      return true;
    }
  }
}
