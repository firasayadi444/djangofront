import { Component } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { ImServiceService } from '../Services/im-service.service';

@Component({
  selector: 'app-mygallery',
  templateUrl: './mygallery.component.html',
  styleUrl: './mygallery.component.css'
})
export class MygalleryComponent {
  gallery !: any[];
  
  constructor(private authService : AuthService, private imService : ImServiceService) {}

  ngOnInit() {
    this.getMyGallery(); // Call the method on component initialization
  }

  getMyGallery() {
    this.authService.getUser().subscribe(user => {
      if (user) {
        const userId = user.id; // Adjust based on your user object structure
        this.imService.getMyImage(userId).subscribe({
          next: (response: any) => {
            this.gallery = response; // Update gallery with response data
          },
          error: (error: any) => {
            console.error('Error fetching images:', error);
          },
          complete: () => {
            console.log('Image fetching complete');
          }
        });
      }
    });
  }

    

}
