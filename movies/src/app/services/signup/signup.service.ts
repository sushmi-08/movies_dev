import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  signUp(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:5000/users/signUp', data);
  }

}
