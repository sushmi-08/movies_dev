import {
	HttpClientTestingModule,
	HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { SigninService } from './signin.service';

fdescribe('SigninService', () => {
  let service: SigninService;
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
    message: 'User not found',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SigninService],
    });
    service = TestBed.inject(SigninService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return user data on successful sign in', () => {
    const mockCredentials = { username: 'mockuser', password: 'mockpassword' };

    service.signIn(mockCredentials).subscribe((response) => {
      expect(response).toBeTruthy();
      expect(response.result).toBe(true);
      expect(response.data.username).toBe('mockuser');
    });

    const req = httpController.expectOne('http://localhost:5000/users/signIn');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockCredentials);

    req.flush(mockSuccessResponse);
  });

  it('should return an error message on failed sign in', () => {
    const mockCredentials = { username: 'wronguser', password: 'wrongpassword' };

    service.signIn(mockCredentials).subscribe(
      () => fail('Expected an error, not user data'),
      (error) => {
        expect(error.error).toBeTruthy();
        expect(error.error.result).toBe(false);
        expect(error.error.message).toBe('User not found');
      }
    );

    const req = httpController.expectOne('http://localhost:5000/users/signIn');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockCredentials);

    req.flush(mockErrorResponse, { status: 404, statusText: 'Not Found' });
  });
});
