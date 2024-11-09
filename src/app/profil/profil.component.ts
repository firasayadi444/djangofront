import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  profileForm: FormGroup;


  constructor(private fb: FormBuilder, private authService: AuthService,private router: Router) {
    this.profileForm = this.fb.group({
      name: [''],
      email: [''],
      password: ['']
    });
  }

  ngOnInit(): void {
    this.authService.loadUserFromLocalStorage();

    this.authService.getUser().subscribe(user => {
      if (user) {
        console.log(user)
        this.profileForm.patchValue({
          name: user.name,
          email: user.email,
          // Optionally leave the password field blank
        });
      }
    });
  }
  updateProfile(): void {
    const updatedData = this.profileForm.value;
    // Call the service to update the user data
    this.authService.getUser().subscribe(user => {
      this.authService.updateProfile(user.id,updatedData).subscribe(response => {
        console.log("Account updated:", response);
        // Handle the account deletion logic, e.g., redirecting or showing a confirmation
    }, error => {
        console.error("Error updating account:", error);
        // Handle error cases, e.g., display a message
    });
    });
  }

  deleteProfile(): void {
    // Call the service to delete the user account
    this.authService.getUser().subscribe(user => {
      this.authService.deleteProfile(user.id).subscribe(response => {
        console.log("Account deleted:", response);
        this.router.navigate(['/login']);
    // Handle the account deletion logic, e.g., redirecting or showing a confirmation
}, error => {
    console.error("Error deleting account:", error);
    // Handle error cases, e.g., display a message
});
  })
  }

}
