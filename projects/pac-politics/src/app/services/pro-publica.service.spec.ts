import { TestBed } from '@angular/core/testing';

import { ProPublicaService } from './pro-publica.service';

describe('ProPublicaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProPublicaService = TestBed.get(ProPublicaService);
    expect(service).toBeTruthy();
  });
});
