import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-navbar-new',
  templateUrl: './navbar-new.component.html',
  styleUrl: './navbar-new.component.css'
})
export class NavbarNewComponent {

  open = false;
  navMenu = [
    {name:'Home', path: '/home'},
    {name:'AI Image Generator', path: '/generate'},
    {name:'AI Upscaler', path: '/home'},
    {name:'Profile', path: '/profil'},
    {name:'Gallery', path: '/gallery'}

  ];

  toggleOpen() {
    this.open = !this.open;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if ((event.target as Window).innerWidth >= 960) {
      this.open = false;
    }
  }


  user:any;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      this.user = user;
      console.log("user",user)
    });
  }

  navigateToProfile(): void {
    this.router.navigate(['/profil']);
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.authService.logout();
    this.user = null;
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
