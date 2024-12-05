import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  constructor(private http: HttpClient) { }

  signIn(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:5000/users/signIn', data);
  }

  haveAccess() {
    const loggedInUser = localStorage.getItem('user');

    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      if (user.username == 'admin') {
        return true;
      } else {
        alert('You are not authorized to access this page');
        return false;
      }
    } else {
      return false;
    }
  }
}
