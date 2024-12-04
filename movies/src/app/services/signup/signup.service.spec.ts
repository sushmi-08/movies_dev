import {
	HttpClientTestingModule,
	HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { SignupService } from './signup.service';

fdescribe('SignupService', () => {
  let service: SignupService;
  let httpController: HttpTestingController;

  const mockSuccessResponse = {
    result: true,
    data: {
      _id: 'mock-user-id',
      username: 'mockuser',
      email: 'mockuser@example.com',
      rented_movies: [],
    },
  };

  const mockErrorResponse = {
    result: false,
    message: 'Validation error',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SignupService],
    });
    service = TestBed.inject(SignupService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return user data on successful sign up', () => {
    const mockUserData = {
      username: 'mockuser',
      password: 'mockpassword',
      rented_movies: [],
      email: 'mockuser@example.com',
    };

    service.signUp(mockUserData).subscribe((response) => {
      expect(response).toBeTruthy();
      expect(response.result).toBe(true);
      expect(response.data.username).toBe('mockuser');
    });

    const req = httpController.expectOne('http://localhost:5000/users/signUp');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockUserData);

    req.flush(mockSuccessResponse);
  });

  it('should return an error message on failed sign up', () => {
    const mockUserData = {
      username: '',
      password: '',
      rented_movies: [],
      email: '',
    };

    service.signUp(mockUserData).subscribe(
      () => fail('Expected an error, not user data'),
      (error) => {
        expect(error.error).toBeTruthy();
        expect(error.error.result).toBe(false);
        expect(error.error.message).toBe('Validation error');
      }
    );

    const req = httpController.expectOne('http://localhost:5000/users/signUp');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockUserData);

    req.flush(mockErrorResponse, { status: 400, statusText: 'Bad Request' });
  });
});
