import { TestBed } from '@angular/core/testing';

import { ServiciosDBService } from './servicios-db.service';

describe('ServiciosDBService', () => {
  let service: ServiciosDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciosDBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
