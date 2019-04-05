import { TestBed } from '@angular/core/testing';

import { BasicDetailsServiceService } from './basic-details-service.service';

describe('BasicDetailsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BasicDetailsServiceService = TestBed.get(BasicDetailsServiceService);
    expect(service).toBeTruthy();
  });
});
