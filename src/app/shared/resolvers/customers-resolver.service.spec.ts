import { TestBed, inject } from '@angular/core/testing';

import { CustomersResolverService } from './customers-resolver.service';

describe('CustomersResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomersResolverService]
    });
  });

  it('should be created', inject([CustomersResolverService], (service: CustomersResolverService) => {
    expect(service).toBeTruthy();
  }));
});
