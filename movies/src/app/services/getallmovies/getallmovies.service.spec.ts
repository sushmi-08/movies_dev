import {
	HttpClientTestingModule,
	HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { GetallmoviesService } from './getallmovies.service';

fdescribe('GetallmoviesService', () => {
  let service: GetallmoviesService;
  let httpController: HttpTestingController;

  const mockResponse = {
    result: true,
    data: [
      {
        _id: 'mock-id-1',
        name: 'Mock Movie 1',
        category: 'Mock Category 1',
        rating: 8.5,
        cast: ['Actor 1', 'Actor 2'],
        director: 'Director 1',
        release_date: '2022-01-01T00:00:00.000Z',
        description: 'Mock description 1',
        duration: 120,
        availability: true,
        image_url: 'https://example.com/mock-movie-1.jpg',
        start_date: null,
        end_date: null,
        __v: 0,
      },
      {
        _id: 'mock-id-2',
        name: 'Mock Movie 2',
        category: 'Mock Category 2',
        rating: 7.2,
        cast: ['Actor 3', 'Actor 4'],
        director: 'Director 2',
        release_date: '2021-01-01T00:00:00.000Z',
        description: 'Mock description 2',
        duration: 110,
        availability: false,
        image_url: 'https://example.com/mock-movie-2.jpg',
        start_date: null,
        end_date: null,
        __v: 0,
      },
    ],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GetallmoviesService],
    });
    service = TestBed.inject(GetallmoviesService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all movies', () => {
    service.getAllMovies().subscribe((response) => {
      expect(response).toBeTruthy();
      expect(response.result).toBe(true);
      expect(response.data.length).toBe(2);
      expect(response.data[0].name).toBe('Mock Movie 1');
      expect(response.data[1].availability).toBe(false);
    });

    const req = httpController.expectOne('http://localhost:5000/movies/allMovies');
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });
});
