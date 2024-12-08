import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  termsAccepted: boolean = false;
  errorMessage: string = ''; // Add this property for error messages

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        localStorage.setItem('token', response.jwt);
        this.authService.loadUserFromLocalStorage();
        this.router.navigate(['/profil']);
      },
      error => {
        console.error('Login failed', error);
        // Display a specific error message based on the backend response
        if (error.status === 403 && error.error.detail) {
          this.errorMessage = error.error.detail;
        } else {
          this.errorMessage = 'Login failed. Please check your credentials and try again.';
        }
      }
    );
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
