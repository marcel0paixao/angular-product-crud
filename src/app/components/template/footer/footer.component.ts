import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  GITHUB_LINK: string = 'https://github.com/marcel0paixao/';

  goToGitHub(): void {
    window.location.href = this.GITHUB_LINK;
  }
}
