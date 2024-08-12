import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  profileForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.profileForm = this.fb.group({
      username: [''],
      email: [''],
      password: ['']
    });
  }

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      if (user) {
        this.profileForm.patchValue({
          username: user.username,
          email: user.email,
          // Optionally leave the password field blank
        });
      }
    });
  }
  updateProfile(): void {
    const updatedData = this.profileForm.value;
    // Call the service to update the user data
    this.authService.updateProfile(updatedData).subscribe(response => {
      // Handle success or error
    });
  }

  deleteProfile(): void {
    // Call the service to delete the user account
    this.authService.deleteProfile().subscribe(response => {
      // Handle account deletion
    });
  }

}
