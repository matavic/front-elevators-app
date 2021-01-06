import { TestBed } from '@angular/core/testing';

import { ElevatorsService } from './elevators.service';

describe('ElevatorsService', () => {
  let service: ElevatorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElevatorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
