import { TestBed } from '@angular/core/testing';

import { FecService } from './fec.service';

describe('FecService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FecService = TestBed.get(FecService);
    expect(service).toBeTruthy();
  });
});
