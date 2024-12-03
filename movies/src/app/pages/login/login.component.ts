import { SigninService } from 'src/app/services/signin/signin.service';

import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private route: Router) {
    localStorage.clear()
  }

  api = inject(SigninService)

  userCredentials: any = {
    username: '',
    password: ''
  }

  isFormValid(): boolean {
    return this.userCredentials.username.length > 3 && this.userCredentials.password.length > 3;
  }

  onSubmit() {
    if (this.isFormValid()) {
      this.api.signIn(this.userCredentials).subscribe((res: any) => {
        if (res.result) {
          localStorage.setItem('user', JSON.stringify(res.data));
          this.route.navigate(['/movielist'])
        }
      }
    )}
  }

}
