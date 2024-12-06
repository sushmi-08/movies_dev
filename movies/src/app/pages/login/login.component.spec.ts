import { of } from 'rxjs';
import { GetallmoviesService } from 'src/app/services/getallmovies/getallmovies.service';
import { SigninService } from 'src/app/services/signin/signin.service';
import { SignupService } from 'src/app/services/signup/signup.service';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let signinServiceSpy: jasmine.SpyObj<SigninService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Create spy objects for the dependencies
    signinServiceSpy = jasmine.createSpyObj('SigninService', ['signIn']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    // SignupService = jasmine.createSpyObj()
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule],
      providers: [
        { provide: SigninService, useValue: signinServiceSpy },
        { provide: Router, useValue: routerSpy },
        {provide:GetallmoviesService, useClass:SigninService}
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return true for a valid form', () => {
    component.userCredentials.username = 'validUser';
    component.userCredentials.password = 'validPass';
    expect(component.isFormValid()).toBeTrue();
  });

  it('should return false for an invalid form', () => {
    component.userCredentials.username = 'us';
    component.userCredentials.password = 'pw';
    expect(component.isFormValid()).toBeFalse();
  });

  it('should call signIn on form submission and navigate to /movielist on success', () => {
    const mockResponse = {
      result: true,
      data: { username: 'testUser', rented_movies: [], email: 'test@example.com' },
    };

    signinServiceSpy.signIn.and.returnValue(of(mockResponse));
    component.userCredentials = { username: 'testUser', password: 'testPass' };

    component.onSubmit();

    expect(signinServiceSpy.signIn).toHaveBeenCalledWith({
      username: 'testUser',
      password: 'testPass',
    });
    expect(localStorage.getItem('user')).toEqual(JSON.stringify(mockResponse.data));
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/movielist']);
  });

  it('should not call signIn if form is invalid', () => {
    component.userCredentials = { username: 'us', password: 'pw' };

    component.onSubmit();

    expect(signinServiceSpy.signIn).not.toHaveBeenCalled();
  });

  // it("should check authentication",()=>{
  //   SigninService.get
  // })
});
