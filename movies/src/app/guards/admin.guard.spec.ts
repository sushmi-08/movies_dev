import { of } from 'rxjs';

import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { SigninService } from '../services/signin/signin.service';
import { AdminGuard } from './admin.guard';

fdescribe('AdminGuard', () => {
  let guard: AdminGuard;
  let signinServiceSpy: jasmine.SpyObj<SigninService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const signinServiceMock = jasmine.createSpyObj('SigninService', ['haveAccess']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AdminGuard,
        { provide: SigninService, useValue: signinServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    });

    guard = TestBed.inject(AdminGuard);
    signinServiceSpy = TestBed.inject(SigninService) as jasmine.SpyObj<SigninService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if haveAccess returns true', () => {
    signinServiceSpy.haveAccess.and.returnValue(true); // Mock haveAccess to return true

    const result = guard.canActivate({} as any, {} as any);

    expect(result).toBeTrue();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should navigate to "movielist" and return false if haveAccess returns false', () => {
    signinServiceSpy.haveAccess.and.returnValue(false); // Mock haveAccess to return false

    const result = guard.canActivate({} as any, {} as any);

    expect(result).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['movielist']);
  });
});
