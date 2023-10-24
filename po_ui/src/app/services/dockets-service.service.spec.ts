import { TestBed } from '@angular/core/testing';

import { DocketsServiceService } from './dockets-service.service';

describe('DocketsServiceService', () => {
  let service: DocketsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocketsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
