import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Import HttpClient
import { ImServiceService } from '../Services/im-service.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  images: any[] = [];

  constructor(private http: HttpClient,private imService: ImServiceService) { }

  ngOnInit(): void {
    this.fetchImages();
  }

  fetchImages(): void {
    this.imService.GetImage().subscribe((data) => {
      this.images = data;
    });
  }
}
