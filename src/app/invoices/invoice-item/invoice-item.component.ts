import { Component, OnInit, Input, OnDestroy, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/publish';

import { InvoiceItem } from '../../core/interfaces/invoice-item';
import { InvoiceItemsService } from '../../core/services/invoice-items.service';

@Component({
  selector: 'app-invoice-item',
  templateUrl: './invoice-item.component.html',
  styleUrls: ['./invoice-item.component.scss']
})
export class InvoiceItemComponent implements OnInit, OnDestroy {
  price$: Observable<number>;
  deleteInvoiceItem$: Subject<InvoiceItem>;
  itemChangeSubscription: Subscription;
  deleteInvoiceItemSubscription: Subscription;
  updateInvoiceItemSubscription: Subscription;

  constructor(
    private invoiceItemsService: InvoiceItemsService,
  ) {}

  @Input() item;
  @Input() products;
  @Input() isEdit;
  @Output() delete = new EventEmitter();

  get product_id(): FormControl {
    return this.item.get('product_id') as FormControl;
  }

  get quantity(): FormControl {
    return this.item.get('quantity') as FormControl;
  }

  get price(): FormControl {
    return this.item.get('price') as FormControl;
  }

  ngOnInit() {
    this.deleteInvoiceItem$ = new Subject<InvoiceItem>();

    this.deleteInvoiceItemSubscription = this.deleteInvoiceItem$
    .switchMap((item) => {
      if (this.isEdit) {
        return this.invoiceItemsService.deleteInvoiceItem(item);
      }
      return Observable.of(item);
    })
    .subscribe(() => this.delete.emit());

    this.price$ = Observable.merge(
      this.product_id.valueChanges.startWith(this.product_id.value),
      this.quantity.valueChanges.startWith(this.quantity.value)
    )
    .map(() => this.products.find((product) => product.id === this.product_id.value))
    .map((product) => product.price * this.quantity.value);

    this.itemChangeSubscription = this.price$.subscribe((price) => {
      this.price.setValue(price);
    });

    this.updateInvoiceItemSubscription = Observable.merge(
      this.product_id.valueChanges,
      this.quantity.valueChanges,
    )
    .filter(() => this.isEdit)
    .filter(() => this.quantity.value)
    .debounceTime(500)
    .distinctUntilChanged()
    .switchMap(() => this.invoiceItemsService.updateInvoiceItem(this.item.value))
    .publish()
    .connect();
  }

  ngOnDestroy() {
    this.itemChangeSubscription.unsubscribe();
    this.deleteInvoiceItemSubscription.unsubscribe();
    this.updateInvoiceItemSubscription.unsubscribe();
  }

  deleteInvoiceItem() {
    this.deleteInvoiceItem$.next(this.item.value);
  }
}
