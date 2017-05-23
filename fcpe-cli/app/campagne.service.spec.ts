import { TestBed, inject } from '@angular/core/testing';

import { CampagneService } from './campagne.service';

describe('CampagneService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CampagneService]
    });
  });

  it('should be created', inject([CampagneService], (service: CampagneService) => {
    expect(service).toBeTruthy();
  }));
});
