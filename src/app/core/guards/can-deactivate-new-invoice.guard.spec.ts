import { TestBed, async, inject } from '@angular/core/testing';

import { CanDeactivateNewInvoiceGuard } from './can-deactivate-new-invoice.guard';

describe('CanDeactivateNewInvoiceGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanDeactivateNewInvoiceGuard]
    });
  });

  it('should ...', inject([CanDeactivateNewInvoiceGuard], (guard: CanDeactivateNewInvoiceGuard) => {
    expect(guard).toBeTruthy();
  }));
});
