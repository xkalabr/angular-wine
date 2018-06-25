import { TestBed, inject } from '@angular/core/testing';

import { BottleService } from './bottle.service';

describe('BottleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BottleService]
    });
  });

  it('should be created', inject([BottleService], (service: BottleService) => {
    expect(service).toBeTruthy();
  }));
});
