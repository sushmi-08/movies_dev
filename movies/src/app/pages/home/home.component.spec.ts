import { of } from 'rxjs';
import { SigninService } from 'src/app/services/signin/signin.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';
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
    // Create spies for SigninService and Router
    const signinServiceMock = jasmine.createSpyObj('SigninService', ['signIn']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [FormsModule, HttpClientTestingModule], // Add FormsModule for ngModel
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

  it('should open the login popup when openLoginPopup is called', () => {
    component.openLoginPopup();
    expect(component.showLoginPopup).toBeTrue();
  });

  it('should close the login popup when closePopup is called', () => {
    component.showLoginPopup = true;
    component.closePopup();
    expect(component.showLoginPopup).toBeFalse();
  });

  it('should close the popup on backdrop click', () => {
    const mockEvent = {
      target: {},
      currentTarget: {},
    };

    // Ensure target and currentTarget are the same
    mockEvent.target = mockEvent.currentTarget;

    spyOn(component, 'closePopup');
    component.closePopupOnBackdrop(mockEvent as MouseEvent);

    expect(component.closePopup).toHaveBeenCalled();
  });

  // it('should not close the popup on click inside the popup', () => {
  //   const mockEvent = {
  //     target: {},
  //     currentTarget: {},
  //   } as MouseEvent;
  //   spyOn(component, 'closePopup');
  //   mockEvent.target = {}; // Simulate clicking inside the popup
  //   component.closePopupOnBackdrop(mockEvent);
  //   expect(component.closePopup).not.toHaveBeenCalled();
  // });

  it('should return true for valid form input in isFormValid', () => {
    component.userCredentials.username = 'validUser';
    component.userCredentials.password = 'validPass';
    expect(component.isFormValid()).toBeTrue();
  });

  it('should return false for invalid form input in isFormValid', () => {
    component.userCredentials.username = 'a';
    component.userCredentials.password = 'b';
    expect(component.isFormValid()).toBeFalse();
  });

  it('should call signIn on valid form submission', () => {
    const mockResponse = {
      result: true,
      data: { username: 'validUser', password: 'validPass' },
    };
    signinServiceSpy.signIn.and.returnValue(of(mockResponse)); // Mock the signIn method
    spyOn(component, 'closePopup');

    component.userCredentials.username = 'validUser';
    component.userCredentials.password = 'validPass';
    component.onSubmit();

    expect(signinServiceSpy.signIn).toHaveBeenCalledWith(component.userCredentials);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/movielist']);
    expect(component.closePopup).toHaveBeenCalled();
  });

  it('should not call signIn on invalid form submission', () => {
    component.userCredentials.username = 'a';
    component.userCredentials.password = 'b';

    component.onSubmit();

    expect(signinServiceSpy.signIn).not.toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
});
