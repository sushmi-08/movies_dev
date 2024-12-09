import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { SigninService } from 'src/app/services/signin/signin.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';

class MockSigninService {
  signIn(credentials: any) {
    return of({ result: true, data: { username: credentials.username } });
  }
}

class MockRouter {
  navigate() {}
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let signinService: SigninService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [FormsModule],  // To use ngModel
      providers: [
        { provide: SigninService, useClass: MockSigninService },
        { provide: Router, useClass: MockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    signinService = TestBed.inject(SigninService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  })

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should return true if form is valid', () => {
    component.userCredentials = { username: 'user123', password: 'password123' };
    expect(component.isFormValid()).toBe(true);
  });

  it('should return false if form is invalid', () => {
    component.userCredentials = { username: 'user', password: '' };
    expect(component.isFormValid()).toBe(false);
  });

  it('should call signinService when form is valid', () => {
    spyOn(signinService, 'signIn').and.callThrough();
    spyOn(router, 'navigate');
    
    component.userCredentials = { username: 'user123', password: 'password123' };
    
    component.onSubmit();
    
    expect(signinService.signIn).toHaveBeenCalledWith({ username: 'user123', password: 'password123' });
  });

  it('should store user data in localStorage and navigate if login is successful', () => {
    spyOn(localStorage, 'setItem');
    spyOn(router, 'navigate');
    
    const response = { result: true, data: { username: 'user123' } };
    spyOn(signinService, 'signIn').and.returnValue(of(response));
    
    component.userCredentials = { username: 'user123', password: 'password123' };
    component.onSubmit();
    
    expect(localStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(response.data));
    expect(router.navigate).toHaveBeenCalledWith(['/movielist']);
  });

  it('should show alert for invalid credentials', () => {
    spyOn(window, 'alert');
    const response = { result: false, data: null };
    spyOn(signinService, 'signIn').and.returnValue(of(response));
    
    component.userCredentials = { username: 'invaliduser', password: 'wrongpassword' };
    component.onSubmit();
    
    expect(window.alert).toHaveBeenCalledWith('Invalid login credentials. Please try again.');
  });

  it('should show an alert if there is an error during login', () => {
    spyOn(window, 'alert');
    spyOn(signinService, 'signIn').and.returnValue(throwError('Login error'));
    
    component.userCredentials = { username: 'user123', password: 'password123' };
    component.onSubmit();
    
    expect(window.alert).toHaveBeenCalledWith('An error occurred while logging in. Please try again later.');
  });

  it('should disable submit button when form is invalid', () => {
    component.userCredentials = { username: '', password: '' };
    fixture.detectChanges();
    const submitButton = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
    expect(submitButton.disabled).toBeTrue();
  });

  it('should enable submit button when form is valid', () => {
    component.userCredentials = { username: 'user123', password: 'password123' };
    fixture.detectChanges();
    const submitButton = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
    expect(submitButton.disabled).toBeFalse();
  });
});



