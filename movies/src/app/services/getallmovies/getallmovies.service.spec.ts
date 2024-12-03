import { TestBed } from '@angular/core/testing';

import { GetallmoviesService } from './getallmovies.service';

describe('GetallmoviesService', () => {
  let service: GetallmoviesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetallmoviesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
