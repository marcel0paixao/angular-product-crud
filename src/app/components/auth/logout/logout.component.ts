import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { HeaderService } from '../../template/header/header.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html'
})
export class LogoutComponent {
  constructor(private authService: AuthService, private headerService: HeaderService, private router: Router, private location: Location) {
    headerService.headerData = {
      title: 'Logout',
      icon: 'logout',
      routeUrl: '/logout'
    }
  }

  NgOnInit(): void {
    this.authService.clearToken();
    this.router.navigate(['/login']);
  }
}
