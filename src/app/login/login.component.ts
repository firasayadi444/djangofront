import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  termsAccepted: boolean = false; // Add this property

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
      }
    );
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}