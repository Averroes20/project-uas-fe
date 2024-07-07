import { TestBed } from '@angular/core/testing';

import { SiswaService } from './siswa.service';

describe('SiswaService', () => {
  let service: SiswaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SiswaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
