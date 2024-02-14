import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  
  goToGitHub(): void {
    window.location.href = 'https://github.com/marcel0paixao/';
  }
}
