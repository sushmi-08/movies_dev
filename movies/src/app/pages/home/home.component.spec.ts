import { of, throwError } from 'rxjs';
import { SigninService } from 'src/app/services/signin/signin.service';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { HomeComponent } from './home.component';

fdescribe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let signinServiceSpy: jasmine.SpyObj<SigninService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const signinServiceMock = jasmine.createSpyObj('SigninService', ['signIn']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [FormsModule],
      providers: [
        { provide: SigninService, useValue: signinServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    signinServiceSpy = TestBed.inject(SigninService) as jasmine.SpyObj<SigninService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should clear localStorage on initialization', () => {
    spyOn(localStorage, 'clear');
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    expect(localStorage.clear).toHaveBeenCalled();
  });

  it('should return true for valid form inputs in isFormValid', () => {
    component.userCredentials.username = 'validUser';
    component.userCredentials.password = 'validPass';
    expect(component.isFormValid()).toBeTrue();
  });

  it('should return false for invalid form inputs in isFormValid', () => {
    component.userCredentials.username = 'a';
    component.userCredentials.password = 'b';
    expect(component.isFormValid()).toBeFalse();
  });

  it('should call signIn on valid form submission', () => {
    const mockResponse = {
      result: true,
      data: { username: 'validUser', password: 'validPass' },
    };
    signinServiceSpy.signIn.and.returnValue(of(mockResponse));

    spyOn(localStorage, 'setItem');

    component.userCredentials.username = 'validUser';
    component.userCredentials.password = 'validPass';
    component.onSubmit();

    expect(signinServiceSpy.signIn).toHaveBeenCalledWith(component.userCredentials);
    expect(localStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(mockResponse.data));
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/movielist']);
  });

  it('should display an alert on invalid login credentials', () => {
    const mockResponse = { result: false };
    signinServiceSpy.signIn.and.returnValue(of(mockResponse));

    spyOn(window, 'alert');

    component.userCredentials.username = 'invalidUser';
    component.userCredentials.password = 'invalidPass';
    component.onSubmit();

    expect(signinServiceSpy.signIn).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Invalid login credentials. Please try again.');
  });

  it('should display an alert on API error', () => {
    signinServiceSpy.signIn.and.returnValue(throwError('API error'));

    spyOn(window, 'alert');
    spyOn(console, 'error');

    component.userCredentials.username = 'validUser';
    component.userCredentials.password = 'validPass';
    component.onSubmit();

    expect(signinServiceSpy.signIn).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith(
      'An error occurred while logging in. Please try again later.'
    );
    expect(console.error).toHaveBeenCalledWith('Login error:', 'API error');
  });

  it('should not call signIn on invalid form submission', () => {
    component.userCredentials.username = 'a';
    component.userCredentials.password = 'b';

    component.onSubmit();

    expect(signinServiceSpy.signIn).not.toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
});
