import { TestBed } from '@angular/core/testing';

import { ImServiceService } from './im-service.service';

describe('ImServiceService', () => {
  let service: ImServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
