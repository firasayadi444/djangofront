import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-home',
  templateUrl: './card-home.component.html',
  styleUrl: './card-home.component.css'
})
export class CardHomeComponent {
  @Input() image : any;

  showFullText = false; // Initial state: show truncated text

  toggleText() {
    this.showFullText = !this.showFullText; // Toggle between full and truncated text
  }
}
