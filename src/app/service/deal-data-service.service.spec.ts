import { TestBed } from '@angular/core/testing';

import { DealDataServiceService } from './deal-data-service.service';

describe('DealDataServiceService', () => {
  let service: DealDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DealDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
