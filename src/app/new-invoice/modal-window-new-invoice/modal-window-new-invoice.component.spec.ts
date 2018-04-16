import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalWindowNewInvoiceComponent } from './modal-window-new-invoice.component';

describe('ModalWindowNewInvoiceComponent', () => {
  let component: ModalWindowNewInvoiceComponent;
  let fixture: ComponentFixture<ModalWindowNewInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalWindowNewInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalWindowNewInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
