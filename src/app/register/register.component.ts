import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.register(this.username, this.email, this.password).subscribe(
      response => {
        // Handle successful registration
        this.router.navigate(['/login']); // Redirect to login after registration
      },
      error => {
        // Handle error
        console.error('Registration failed', error);
      }
    );
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
