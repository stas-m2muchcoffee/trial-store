import { TestBed, inject } from '@angular/core/testing';

import { InvoiceResolverService } from './invoice-resolver.service';

describe('InvoiceResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InvoiceResolverService]
    });
  });

  it('should be created', inject([InvoiceResolverService], (service: InvoiceResolverService) => {
    expect(service).toBeTruthy();
  }));
});
