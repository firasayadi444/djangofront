import { Component } from '@angular/core';
import { ImServiceService } from '../Services/im-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  images = [
    {
      image_url: "/image/blogs/blog-1.svg",
      prompt: "Future of Web Development: Trends and Innovations",
      
    },
    {
      image_url: "/image/blogs/blog2.svg",
      prompt: "WebDev Pro Code-a-Thon: Build a Responsive Website",
      
    },
    {
      image_url: "/image/blogs/blog3.svg",
      prompt: "Ask the Experts: Frontend Web Development",
      
    },
    {
      image_url: "/image/blogs/blog4.svg",
      prompt: "Web Accessibility: Building Inclusive Websites",
      
    },
    {
      image_url: "/image/blogs/blog-1.svg",
      prompt: "Future of Web Development: Trends and Innovations",
      desc: "Discover the latest trends and innovations shaping the future of web development.",
      buttonLabel: "register for free",
    },
    {
      image_url: "/image/blogs/blog2.svg",
      prompt: "WebDev Pro Code-a-Thon: Build a Responsive Website",
      
    },
    {
      image_url: "/image/blogs/blog3.svg",
      prompt: "Ask the Experts: Frontend Web Development",
      
    },
    {
      image_url: "/image/blogs/blog4.svg",
      prompt: "Web Accessibility: Building Inclusive Websites",
      
    },
    {
      image_url: "/image/blogs/blog4.svg",
      prompt: "Web Accessibility: Building Inclusive Websites",
      
    },
  ];
}
