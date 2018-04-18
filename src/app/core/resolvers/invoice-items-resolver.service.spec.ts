import { TestBed, inject } from '@angular/core/testing';

import { InvoiceItemsResolverService } from './invoice-items-resolver.service';

describe('InvoiceItemsResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InvoiceItemsResolverService]
    });
  });

  it('should be created', inject([InvoiceItemsResolverService], (service: InvoiceItemsResolverService) => {
    expect(service).toBeTruthy();
  }));
});
