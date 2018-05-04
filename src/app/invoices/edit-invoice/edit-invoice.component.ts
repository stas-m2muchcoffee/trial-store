import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/filter';

import { Customer } from '../../core/interfaces/customer';
import { CustomerService } from '../../core/services/customer.service';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/interfaces/product';
import { InvoiceItem } from '../../core/interfaces/invoice-item';
import { InvoiceItemsService } from '../../core/services/invoice-items.service';
import { Invoice } from '../../core/interfaces/invoice';
import { InvoiceService } from '../../core/services/invoice.service';
import { ModalService } from '../../core/services/modal.service';
import {isBoolean} from 'util';

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
  invoiceSubscription: Subscription;
  invoiceItemsSubscription: Subscription;
  itemsChangeSubscription: Subscription;
  customerChangeSubscription: Subscription;
  addProduct$: Observable<InvoiceItem>;
  addProductSubscription: Subscription;
  deleteInvoiceSubscription: Subscription;
  updateInvoiceItemSubscription: Subscription;
  updateInvoiceSubscription: Subscription;
  removeInvoiceItem$: Subject<number> = new Subject<number>();
  updateInvoiceItem$: Subject<InvoiceItem> = new Subject<InvoiceItem>();
  invoice: Invoice;
  invoiceItems: InvoiceItem[];
  i: number = null;

  constructor(
    private customerService: CustomerService,
    private productService: ProductService,
    private invoiceItemsService: InvoiceItemsService,
    private invoiceService: InvoiceService,
    private modalService: ModalService
  ) {}

  get customer_id(): FormControl {
    return this.editInvoiceForm.get('customer_id') as FormControl;
  }
  get items(): FormArray {
    return this.editInvoiceForm.get('items') as FormArray;
  }
  get total(): FormControl {
    return this.editInvoiceForm.get('total') as FormControl;
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
    this.invoiceSubscription = this.invoice$.subscribe(invoice => this.invoice = invoice);
    this.invoiceItemsSubscription = this.invoiceItems$.subscribe(invoiceItems => this.invoiceItems = invoiceItems);

    // начальная инициализация формы
    this.createForm();

    // изменение кастомера
    this.customerChangeSubscription = this.customer_id.valueChanges
      .switchMap((customer_id) => this.invoiceService.updateInvoice({customer_id: customer_id} as Invoice, this.invoice.id))
      .subscribe();

    // добавление продукта
    this.addProduct$ = this.addProduct.valueChanges
    .filter((id) => id)
    .switchMap((product_id) => this.invoiceItemsService.createInvoiceItem({product_id: product_id, quantity: 1}, this.invoice.id)
      .take(1)
    );

    this.addProductSubscription = this.addProduct$
    .subscribe((item) => {
      this.addItem(item);
      this.addProduct.reset(null, {emitEvent: false});
    });

    this.updateInvoiceSubscription = this.addProduct$
    .switchMap(() => this.invoiceService.updateInvoice({...this.editInvoiceForm.value} as Invoice, this.invoice.id))
    .subscribe();

    // удаление item
    this.deleteInvoiceSubscription = this.removeInvoiceItem$
      .switchMap((itemId) => this.invoiceItemsService.deleteInvoiceItem(itemId, this.invoice.id)
        .debounceTime(500)
        .take(1)
      )
      .map(() => { this.items.removeAt(this.i); this.i = null; })
      .switchMap(() => this.invoiceService.updateInvoice({...this.editInvoiceForm.value} as Invoice, this.invoice.id))
      .subscribe();

    // изменение item
    this.updateInvoiceItemSubscription = this.updateInvoiceItem$
      .debounceTime(500)
      .map((item) => this.invoiceItemsService.updateInvoiceItem(item, item.id, this.invoice.id))
      .switchMap(() => this.invoiceService.updateInvoice({...this.editInvoiceForm.value} as Invoice, this.invoice.id))
      .subscribe();

    // изменение form array для подсчета total
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
      .subscribe((items) => this.getTotal(items));
  }

  ngOnDestroy() {
    this.invoiceSubscription.unsubscribe();
    this.invoiceItemsSubscription.unsubscribe();
    this.itemsChangeSubscription.unsubscribe();
    this.customerChangeSubscription.unsubscribe();
    this.addProductSubscription.unsubscribe();
    this.deleteInvoiceSubscription.unsubscribe();
    this.updateInvoiceItemSubscription.unsubscribe();
  }

  createForm() {
    this.editInvoiceForm = new FormGroup({
      customer_id: new FormControl(null, Validators.required),
      items: new FormArray([], [Validators.minLength(1), Validators.required]),
      total: new FormControl(null),
      addProduct: new FormControl(null)
    });
    this.customer_id.setValue(this.invoice.customer_id);
    this.total.setValue(this.invoice.total);
    this.invoiceItems.forEach((item) => this.addItem(item));
  }

  addItem(item: InvoiceItem) {
    this.items.push(new FormGroup({
      product_id: new FormControl(item.product_id),
      quantity: new FormControl(item.quantity, [Validators.min(1), Validators.required]),
      id: new FormControl(item.id)
    }));
  }

  getTotal(items) {
    let total = 0;
    items.forEach((item) => {
      total += (item.product.price * item.quantity) * (1 - this.invoice.discount / 100);
    });
    this.total.setValue(total);
  }

  deleteInvoiceItem(i: number, item: FormGroup) {
    if (this.editInvoiceForm.valid && this.items.length > 1) {
      this.removeInvoiceItem$.next(item.value.id);
      this.i = i;
    }
  }

  updateInvoiceItem(item: InvoiceItem) {
    if (this.editInvoiceForm.valid && item.quantity !== null) {
      this.updateInvoiceItem$.next(item);
    }
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.editInvoiceForm.invalid) {
      return this.modalService.confirmModal('Your changes have not been saved. Do you want to leave?');
    } else {
      return true;
    }
  }
}
