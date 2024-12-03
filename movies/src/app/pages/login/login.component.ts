import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userCredentials: any = {
    username: '',
    password: ''
  }

  isFormValid(): boolean {
    return this.userCredentials.username.length > 3 && this.userCredentials.password.length > 3;
  }

  onSubmit() {
    if (this.isFormValid()) {
      console.log(this.userCredentials);
    }
  }

}
