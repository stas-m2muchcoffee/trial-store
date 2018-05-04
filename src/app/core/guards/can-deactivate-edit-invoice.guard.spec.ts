import { TestBed, async, inject } from '@angular/core/testing';

import { CanDeactivateEditInvoiceGuard } from './can-deactivate-edit-invoice.guard';

describe('CanDeactivateEditInvoiceGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanDeactivateEditInvoiceGuard]
    });
  });

  it('should ...', inject([CanDeactivateEditInvoiceGuard], (guard: CanDeactivateEditInvoiceGuard) => {
    expect(guard).toBeTruthy();
  }));
});
