import { Component } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { ImServiceService } from '../Services/im-service.service';

@Component({
  selector: 'app-mygallery',
  templateUrl: './mygallery.component.html',
  styleUrls: ['./mygallery.component.css']
})
export class MygalleryComponent {
  gallery: any[] = [];  // Initialized gallery to avoid undefined issues
  
  constructor(private authService: AuthService, private imService: ImServiceService) {}

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

  // Like the image
  likeImage(image: any) {
    image.likes += 1; // Increment the likes count
    this.imService.updateImage(image.id, { likes: image.likes }).subscribe({
      next: (response) => {
        console.log('Image liked', response);
      },
      error: (error) => {
        console.error('Error liking image:', error);
      }
    });
  }

  // Toggle visibility of the image
  toggleVisibility(image: any) {
    image.visibility = !image.visibility; // Toggle visibility status
    this.imService.updateImage(image.id, { visibility: image.visibility }).subscribe({
      next: (response) => {
        console.log('Image visibility updated', response);
      },
      error: (error) => {
        console.error('Error updating visibility:', error);
      }
    });
  }

  // Share the image URL (set visibility to true)
  shareImage(image: any) {
    image.visibility = true; // Make image visible
    this.imService.updateImage(image.id, { visibility: true }).subscribe({
      next: (response: any) => {
        console.log('Image visibility set to true', response);
      },
      error: (error: any) => {
        console.error('Error sharing image:', error);
      }
    });
  }
}
