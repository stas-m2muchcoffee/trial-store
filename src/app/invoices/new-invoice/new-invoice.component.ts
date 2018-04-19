import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { CustomerService } from '../../core/services/customer.service';
import { InvoiceService } from '../../core/services/invoice.service';
import { ProductService } from '../../core/services/product.service';
import { InvoiceItemsService } from '../../core/services/invoice-items.service';
import { ModalService } from '../../core/services/modal.service';
import { Customer } from '../../core/interfaces/customer';
import { Product } from '../../core/interfaces/product';
import { Invoice } from '../../core/interfaces/invoice';

import { ModalWindowNewInvoiceComponent } from './modal-window-new-invoice/modal-window-new-invoice.component';

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
  discountChangeSubscription: Subscription;
  productPrice = 0;
  productPrices: number[] = [];
  total = 0;

  constructor(
    private customerService: CustomerService,
    private invoiceService: InvoiceService,
    private productService: ProductService,
    private invoiceItemsService: InvoiceItemsService,
    private dialog: MatDialog,
    private modalService: ModalService
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

    this.discountChangeSubscription = this.discount.valueChanges
    .subscribe(() => this.getTotal());
  }
  ngOnDestroy() {
    this.addProductSubscription.unsubscribe();
    this.discountChangeSubscription.unsubscribe();
  }

  createForm() {
    this.newInvoiceForm = new FormGroup({
      customer_id: new FormControl(null, Validators.required),
      items: new FormArray([], Validators.minLength(1)),
      discount: new FormControl(0, [Validators.min(0), Validators.max(50)]),
      addProduct: new FormControl(null)
    });
  }
  addItem(product: Product) {
    this.items.push(new FormGroup({
      product_id: new FormControl(product.id),
      quantity: new FormControl(1, Validators.min(1)),
    }));
    this.productPrices.push(product.price);
    this.getTotal();
  }
  getTotal(productPrice?: number, i?: number) {
    let total = 0;
    if (productPrice) {
      this.productPrices[i] = productPrice;
    }
    this.productPrices.forEach((price) => {
      total += price;
    });
    this.total = total * (1 - this.discount.value / 100);
  }
  deleteInvoice(i: number) {
    this.items.removeAt(i);
    this.productPrices.splice(i, 1);
    this.getTotal();
  }
  createInvoice() {
    if (this.newInvoiceForm.valid) {
      this.invoiceService.createInvoice({...this.newInvoiceForm.value, total: this.total})
      .subscribe((inv) => {
        console.log(inv);
      });
    }
    console.log({...this.newInvoiceForm.value, total: this.total});
  }
  canDeactivate(): Observable<boolean> | boolean {
    if (this.newInvoiceForm.dirty) {
      this.dialog.open(ModalWindowNewInvoiceComponent);
      return this.modalService.navigateAwaySelection$;
    } else {
      return true;
    }
  }
}




// @Component({
//   selector: 'app-new-invoice',
//   templateUrl: './new-invoice.component.html',
//   styleUrls: ['./new-invoice.component.scss']
// })
// export class NewInvoiceComponent implements OnInit, OnDestroy {
//   newInvoiceForm: FormGroup;
//   customers$: Observable<Customer[]>;
//   products$: Observable<Product[]>;
//   products: Product[];
//   total = 0;
//
//   constructor(
//     private customerService: CustomerService,
//     private invoiceService: InvoiceService,
//     private productService: ProductService,
//     private invoiceItemsService: InvoiceItemsService,
//     private formBuilder: FormBuilder,
//     private dialog: MatDialog,
//     private modalService: ModalService
//   ) {}
//
//   ngOnInit() {
//     this.createForm();
//     this.customers$ = this.customerService.customers$;
//     this.products$ = this.productService.products$;
//     this.products$.subscribe(products => this.products = products);
//
//     this.newInvoiceForm.controls['discount'].valueChanges.subscribe(() => {
//       this.getTotal();
//     });
//   }
//   get productsControl(): FormArray {
//     return this.newInvoiceForm.get('products') as FormArray;
//   }
//   createForm(): void {
//     this.newInvoiceForm = this.formBuilder.group({
//       customerId: [null, Validators.required],
//       products: this.formBuilder.array([], Validators.minLength(2)),
//       discount: [0, [Validators.max(50), Validators.min(0)]]
//     });
//     this.addProduct();
//   }
//   addProduct(): void {
//     const products = <FormArray>this.newInvoiceForm.controls['products'];
//     products.push(this.formBuilder.group({
//       productId: null,
//       productQty: [0, Validators.min(0)],
//       productPrice: 0
//     }));
//     this.productsControl.controls.forEach((control) => {
//       control.valueChanges.subscribe(invItem => {
//         const selectedProduct = this.products.find(product => product.id === invItem.productId);
//         if (selectedProduct) {
//           control.value.productPrice = (selectedProduct.price * control.value.productQty).toFixed(2);
//           this.getTotal();
//         }
//       });
//     });
//     this.productsControl.controls[this.productsControl.controls.length - 1].valueChanges.subscribe(() => {
//       if ( this.productsControl.controls[this.productsControl.controls.length - 1].value.productId !== null ) {
//         this.addProduct();
//       }
//     });
//   }
//   getTotal(): void {
//     this.total = 0;
//     this.productsControl.controls.forEach((control) => {
//       this.total += control.value.productPrice * ( 1 - this.newInvoiceForm.get('discount').value / 100);
//     });
//   }
//   deleteInvoice(i: number): void {
//     this.productsControl.removeAt(i);
//     this.getTotal();
//   }
//   createInvoice(): void {
//     if (this.newInvoiceForm.valid) {
//     const invoice: Invoice = {
//         items: [],
//         customer_id: this.newInvoiceForm.get('customerId').value,
//         discount: this.newInvoiceForm.get('discount').value,
//         total: this.total
//       };
//       this.invoiceService.createInvoice(invoice).subscribe((inv) => {
//         this.createInvoiceItem(inv.id);
//       });
//     }
//   }
//   createInvoiceItem(id: number): void {
//     this.newInvoiceForm.get('products').value.forEach(product => {
//       if (product.productId !== null) {
//         const invoiceItem = {
//           invoice_id: id,
//           product_id: product.productId,
//           quantity: product.productQty
//         };
//         this.invoiceItemsService.createInvoiceItem(invoiceItem, id).subscribe();
//       }
//     });
//     this.createForm();
//     this.total = 0;
//   }
//   canDeactivate(): Observable<boolean> | boolean {
//     if (this.newInvoiceForm.dirty) {
//       this.openModal();
//       return this.modalService.navigateAwaySelection$;
//     } else {
//       return true;
//     }
//   }
//   openModal(): void {
//     this.dialog.open(ModalWindowNewInvoiceComponent, {
//       width: '250px',
//     });
//   }
//   ngOnDestroy() {
//
//   }
// }
