import { Component } from '@angular/core';
import { ImServiceService } from '../Services/im-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  imageUrl: string | undefined;
  prompt: string = ''; // Initialize prompt as an empty string
  Status: string = '';
  Gen_butt: boolean = true; // Initially show the button
  isLoading: boolean = false; // Add a property to handle loading state

  constructor(private imageService: ImServiceService) {}

  generateImage(prompt: string, width: number, height: number) {
    this.isLoading = true; // Set loading to true when starting the request
    this.Gen_butt = false; // Hide the button while processing

    this.imageService.generateImage(prompt, width, height).subscribe(
      response => {
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
      this.generateImage(this.prompt, 300, 300);
    } else {
      console.error('Prompt is required');
    }
  }
}
