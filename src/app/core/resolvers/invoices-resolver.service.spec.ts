import { TestBed, inject } from '@angular/core/testing';

import { InvoicesResolverService } from './invoices-resolver.service';

describe('InvoicesResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InvoicesResolverService]
    });
  });

  it('should be created', inject([InvoicesResolverService], (service: InvoicesResolverService) => {
    expect(service).toBeTruthy();
  }));
});
