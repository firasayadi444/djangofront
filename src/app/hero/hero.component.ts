import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  @Input() user!: any;

  Images = [
    {
      image_url: 'assets/blogs/blog-1.png',
      prompt: 'This article explores the intricate relationship between social media usage and mental health.',
    },
    {
      image_url: 'assets/blogs/blog-2.png',
      prompt: 'Mental Health in the Digital Age',
    },
    {
      image_url: 'assets/blogs/blog-3.png',
      prompt: 'This article explores the intricate relationship between social media usage and mental health. Mars Colonization and Beyond',
    },
  ];
}
