import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RentedComponent } from './rented.component';
import { MatTableModule } from '@angular/material/table';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GetallmoviesService } from 'src/app/services/getallmovies/getallmovies.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('RentedComponent', () => {
  let component: RentedComponent;
  let fixture: ComponentFixture<RentedComponent>;
  let apiService: GetallmoviesService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RentedComponent],
      imports: [MatTableModule, HttpClientTestingModule],
      providers: [GetallmoviesService],
      schemas: [NO_ERRORS_SCHEMA]  // To ignore unrecognized elements like mat-table
    }).compileComponents();

    fixture = TestBed.createComponent(RentedComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(GetallmoviesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAllMovies and display rented movies', () => {
    const mockResponse = {
      result: true,
      data: [
        { name: 'Movie 1', start_date: '2023-12-01', end_date: '2023-12-15', category: 'Action', language: 'English', availability: false },
        { name: 'Movie 2', start_date: '2023-12-05', end_date: '2023-12-20', category: 'Drama', language: 'Spanish', availability: false }
      ]
    };

    spyOn(apiService, 'getAllMovies').and.returnValue(of(mockResponse));

    component.ngOnInit();
    fixture.detectChanges();

    // Check that the rentedMovies array is populated correctly
    // expect(component.rentedMovies.length).toBe(2);
    expect(component.rentedMovies[0].name).toBe('Movie 1');
    expect(component.rentedMovies[1].name).toBe('Movie 2');
    console.log("printing datasource");
    
    // console.log(component.dataSource.data.length);
    
    expect(component.dataSource.data.length).toBe(2);

   
  });

  it('should display the "No movies rented" message when there are no rented movies', () => {
    const mockResponse = {
      result: true,
      data: []
    };

    spyOn(apiService, 'getAllMovies').and.returnValue(of(mockResponse));

    component.ngOnInit();
    fixture.detectChanges();

    const noMoviesMessage = fixture.nativeElement.querySelector('p.text-gray-600');
    expect(noMoviesMessage).toBeTruthy();
    expect(noMoviesMessage.textContent).toContain('No movies rented till now');
  });

  it('should handle API error', () => {
    spyOn(apiService, 'getAllMovies').and.returnValue(of({ result: false, data: [] }));

    component.ngOnInit();
    fixture.detectChanges();

    // Check that rentedMovies is still empty after API error
    expect(component.rentedMovies.length).toBe(0);
    expect(component.dataSource.data.length).toBe(0);

    // Check if the table is not rendered
    const table = fixture.nativeElement.querySelector('table');
    expect(table).toBeNull();
  });

  it('should correctly format start_date and end_date in the table', () => {
    const mockResponse = {
      result: true,
      data: [
        { name: 'Movie 1', start_date: '2023-12-01', end_date: '2023-12-15', category: 'Action', language: 'English', availability: false }
      ]
    };

    spyOn(apiService, 'getAllMovies').and.returnValue(of(mockResponse));

    component.ngOnInit();
    fixture.detectChanges();

    const startDateCell = fixture.nativeElement.querySelector('td.mat-cell:nth-child(2)');
    expect(startDateCell.textContent).toBe(' 12/1/23 '); // Assuming shortDate format

    const endDateCell = fixture.nativeElement.querySelector('td.mat-cell:nth-child(3)');
    expect(endDateCell.textContent).toBe(' 12/15/23 ');
  });

 
});
