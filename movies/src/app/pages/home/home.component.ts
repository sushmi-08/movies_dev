// import { SigninService } from 'src/app/services/signin/signin.service';

// import { Component, inject } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css'],
// })
// export class HomeComponent {
//   showLoginPopup = false;
//   userCredentials = { username: '', password: '' };
//   api = inject(SigninService);
//   constructor(private route: Router) {
//     localStorage.clear()
//   }

//   openLoginPopup() {
//     this.showLoginPopup = true;
//   }
//   closePopup() {
//     this.showLoginPopup = false;
//   }
//   closePopupOnBackdrop(event: MouseEvent) {
//     if (event.target === event.currentTarget) {
//       this.closePopup();
//     }
//   }
//   isFormValid(): boolean {
//     return (
//       this.userCredentials.username.length > 3 &&
//       this.userCredentials.password.length > 3
//     );
//   }
//   onSubmit() {
//     if (this.isFormValid()) {
//       this.api.signIn(this.userCredentials).subscribe((res: any) => {
//         if (res.result) {
//           localStorage.setItem('user', JSON.stringify(res.data));
//           this.route.navigate(['/movielist']);
//           this.closePopup();
//         }
//       });
//     }
//   }
// }


import { SigninService } from 'src/app/services/signin/signin.service';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userCredentials = { username: '', password: '' };

  constructor(private route: Router, private signinService: SigninService) {
    localStorage.clear();
  }

  ngOnInit(): void {

  }

  isFormValid(): boolean {
    return (
      this.userCredentials.username.length > 3 &&
      this.userCredentials.password.length > 3
    );
  }

  onSubmit(): void {
    if (this.isFormValid()) {
      this.signinService.signIn(this.userCredentials).subscribe(
        (response: any) => {
          if (response.result) {
            localStorage.setItem('user', JSON.stringify(response.data));
            this.route.navigate(['/movielist']);
          } else {
            console.log('Invalid credentials:', response);
            alert('Invalid login credentials. Please try again.');
          }
        },
        (error) => {
          alert('An error occurred while logging in. Please try again later.');
          console.error('Login error:', error);
        }
      );
    }else{
      alert('Invalid Credentials. Please try again')
    }
  }
}
