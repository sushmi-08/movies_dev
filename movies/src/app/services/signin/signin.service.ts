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
}
