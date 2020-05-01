import { TestBed } from '@angular/core/testing';

import { ServicioCrudService } from './servicio-crud.service';

describe('ServicioCrudService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicioCrudService = TestBed.get(ServicioCrudService);
    expect(service).toBeTruthy();
  });
});
