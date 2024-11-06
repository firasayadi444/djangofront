import { Component } from '@angular/core';
import { ImServiceService } from '../Services/im-service.service';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrl: './generate.component.css'
})
export class GenerateComponent {
  imageUrl!: string;
  prompt: string = ''; // Initialize prompt as an empty string
  Status: string = '';
  Gen_butt: boolean = true; // Initially show the button
  isLoading: boolean = false; // Add a property to handle loading state

  constructor(private imageService: ImServiceService, private authService: AuthService  , private router: Router  // Inject Router
  ) {}

  generateImage(prompt: string, width: number, height: number) {
    console.log("image gen meth");

    this.isLoading = true; // Set loading to true when starting the request
    this.Gen_butt = false; // Hide the button while processing

    this.imageService.generateImage(prompt, width, height).subscribe(
      response => {
        console.log("response in");

        this.isLoading = false; // Set loading to false once the request is complete
        this.Gen_butt = true; // Show the button again

        if (response.image_url) {
          this.imageUrl = response.image_url;
          this.Status = response.status;
        } else {
          this.imageUrl = '';
          this.Status = response.status;
          console.error('Image data not found in the response.');
        }
      },
      error => {
        this.isLoading = false; // Set loading to false on error
        this.Gen_butt = true; // Show the button again

        this.Status = error.error.status;
        console.error('Error generating image:', error);
      }
    ); 
  }

  generate() {
    if (this.prompt) {
        console.log("prompt verified");
        
      this.generateImage(this.prompt, 512, 512);
    } else {
      console.error('Prompt is required');
    }
  }

  downloadImage() {
    if (this.imageUrl) {
      fetch(this.imageUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.blob(); // Convert to Blob
        })
        .then(blob => {
          const url = window.URL.createObjectURL(blob); // Create a URL for the blob
          const link = document.createElement('a'); // Create an anchor element
          link.href = url; // Set the href to the blob URL
          link.download = 'downloaded-image.png'; // Specify the file name
          
          // Append to the body, click and remove the link
          document.body.appendChild(link);
          link.click(); // Trigger the download
          document.body.removeChild(link); // Clean up
          window.URL.revokeObjectURL(url); // Free up memory
        })
        .catch(error => {
          console.error('Error downloading image:', error);
        });
    } else {
      console.error('No image URL found to download.');
    }
  }

  saveImage() {
    if (this.imageUrl && this.prompt) {
      // Get user ID from AuthService
      this.authService.getUser().subscribe(user => {
        if (user) {
          const userId = user.id; // Adjust based on your user object structure
          const saveData = {
            user_id: userId,
            image_url: this.imageUrl,
            prompt: this.prompt
          };

          // Call your save image service method
          this.imageService.saveImage(saveData).subscribe(
            response => {
              console.log('Image saved successfully:', response);
              this.Status = 'Image saved successfully!';
              this.router.navigate(['/gallery']);

            },
            error => {
              console.error('Error saving image:', error);
              this.Status = 'Error saving image.';
            }
          );
        } else {
          console.error('User is not logged in');
        }
      });
    } else {
      console.error('Image URL and prompt are required to save the image.');
    }
  }

}
