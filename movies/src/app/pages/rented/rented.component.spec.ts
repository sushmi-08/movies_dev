import { of } from 'rxjs';
import { GetallmoviesService } from 'src/app/services/getallmovies/getallmovies.service';

import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { RentedComponent } from './rented.component';

// Mock Card Component
@Component({
  selector: 'app-card',
  template: '<div></div>',
})
class MockCardComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() director!: string;
  @Input() cast!: string[];
  @Input() image_url!: string;
}

fdescribe('RentedComponent', () => {
  let component: RentedComponent;
  let fixture: ComponentFixture<RentedComponent>;
  let getAllMoviesSpy: jasmine.SpyObj<GetallmoviesService>;

  const mockMovies = [
    {
      name: 'Movie 1',
      description: 'Description 1',
      director: 'Director 1',
      cast: ['Actor 1', 'Actor 2'],
      image_url: 'url1',
      availability: false,
    },
    {
      name: 'Movie 2',
      description: 'Description 2',
      director: 'Director 2',
      cast: ['Actor 3', 'Actor 4'],
      image_url: 'url2',
      availability: true,
    },
  ];

  beforeEach(async () => {
    const getallmoviesServiceMock = jasmine.createSpyObj('GetallmoviesService', ['getAllMovies']);

    await TestBed.configureTestingModule({
      declarations: [RentedComponent, MockCardComponent],
      providers: [{ provide: GetallmoviesService, useValue: getallmoviesServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(RentedComponent);
    component = fixture.componentInstance;
    getAllMoviesSpy = TestBed.inject(GetallmoviesService) as jasmine.SpyObj<GetallmoviesService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch rented movies and filter unavailable ones', () => {
    getAllMoviesSpy.getAllMovies.and.returnValue(of({ result: true, data: mockMovies }));

    fixture.detectChanges();

    expect(getAllMoviesSpy.getAllMovies).toHaveBeenCalled();
    expect(component.rentedMovies.length).toBe(1);
    expect(component.rentedMovies[0].name).toBe('Movie 1');
  });

  it('should display rented movies if available', () => {
    getAllMoviesSpy.getAllMovies.and.returnValue(of({ result: true, data: mockMovies }));

    fixture.detectChanges();

    const cardComponents = fixture.debugElement.queryAll(By.css('app-card'));
    expect(cardComponents.length).toBe(1);
  });

  it('should display fallback message when no movies are rented', () => {
    getAllMoviesSpy.getAllMovies.and.returnValue(of({ result: true, data: [] }));

    fixture.detectChanges();

    const fallbackMessage = fixture.debugElement.query(By.css('.text-gray-600'));
    expect(fallbackMessage).toBeTruthy();
    expect(fallbackMessage.nativeElement.textContent.trim()).toBe('No movies rented till now');
  });
});
