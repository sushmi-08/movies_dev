import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetallmoviesService } from 'src/app/services/getallmovies/getallmovies.service';

import { MovielistComponent } from './movielist.component';
import { of } from 'rxjs/internal/observable/of';
import { Router } from '@angular/router';

class MockMovieService {
  getAllMovies() {
    return of({ data: [{ id: 1, name: 'Movie 1' }] });
  }

  getMovieByCategory(category: string) {
    return of({
      result: true,
      data: [{ id: 1, name: 'Filtered Movie 1' }]
    });
  }
}

// Mock the Router
class MockRouter {
  navigate(path: string[]) {}
}

describe('MovieListComponent', () => {
  let component: MovielistComponent;
  let fixture: ComponentFixture<MovielistComponent>;
  let movieService: MockMovieService;
  let router: MockRouter;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovielistComponent],
      providers: [
        { provide: GetallmoviesService, useClass: MockMovieService },
        { provide: Router, useClass: MockRouter }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovielistComponent);
    component = fixture.componentInstance;
    movieService = TestBed.inject(GetallmoviesService);
    router = TestBed.inject(Router);
    fixture.detectChanges(); // Trigger initial change detection
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch movies on ngOnInit', () => {
    spyOn(movieService, 'getAllMovies').and.callThrough();
    component.ngOnInit();
    expect(movieService.getAllMovies).toHaveBeenCalled();
    expect(component.movies.length).toBeGreaterThan(0);
    expect(component.movies[0].name).toBe('Movie 1');
  });

  it('should filter movies by category on search term change', (done) => {
    spyOn(movieService, 'getMovieByCategory').and.callThrough();
    component.searchTerm = 'action';
    component.onSearchTermChange(); // Trigger search term change

    setTimeout(() => {
      expect(movieService.getMovieByCategory).toHaveBeenCalledWith('action');
      expect(component.filteredMovies.length).toBeGreaterThan(0);
      expect(component.filteredMovies[0].name).toBe('Filtered Movie 1');
      done(); // Ensure the test waits for async completion
    }, 350); // Wait for debounceTime (300ms)
  });

  it('should call selectMovie and navigate to the movie details page', () => {
    const mockMovie = { _id: '123', name: 'Movie 1' };
    spyOn(router, 'navigate');
    component.selectMovie(mockMovie);
    expect(component.searchTerm).toBe('Movie 1');
    expect(component.filteredMovies).toEqual([]);
    expect(router.navigate).toHaveBeenCalledWith(['/moviedetail/123']);
  });

  it('should toggle the genre dropdown visibility', () => {
    expect(component.showDropdown).toBeFalse();
    component.toggleGenreDropdown();
    expect(component.showDropdown).toBeTrue();
    component.toggleGenreDropdown();
    expect(component.showDropdown).toBeFalse();
  });
});
