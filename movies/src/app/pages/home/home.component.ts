import { SigninService } from 'src/app/services/signin/signin.service';

import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  showLoginPopup = false;
  userCredentials = { username: '', password: '' };
  api = inject(SigninService);
  constructor(private route: Router) {
    localStorage.clear()
  }

  openLoginPopup() {
    this.showLoginPopup = true;
  }
  closePopup() {
    this.showLoginPopup = false;
  }
  closePopupOnBackdrop(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.closePopup();
    }
  }
  isFormValid(): boolean {
    return (
      this.userCredentials.username.length > 3 &&
      this.userCredentials.password.length > 3
    );
  }
  onSubmit() {
    if (this.isFormValid()) {
      this.api.signIn(this.userCredentials).subscribe((res: any) => {
        if (res.result) {
          localStorage.setItem('user', JSON.stringify(res.data));
          this.route.navigate(['/movielist']);
          this.closePopup();
        }
      });
    }
  }
}
