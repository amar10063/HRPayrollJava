import { TestBed } from '@angular/core/testing';

import { BasicdetailsserviceService } from './basicdetailsservice.service';

describe('BasicdetailsserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BasicdetailsserviceService = TestBed.get(BasicdetailsserviceService);
    expect(service).toBeTruthy();
  });
});
