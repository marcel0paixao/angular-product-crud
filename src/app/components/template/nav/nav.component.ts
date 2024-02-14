import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { DialogAnimationsDialog } from '../../dialogs/dialog-animations/dialog-animations.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  constructor(private readonly authService: AuthService, public dialog: MatDialog) {}

  getToken(): boolean {
    return !!this.authService.getToken();
  }

  openLogout(): void {
    if (this.dialog.openDialogs.length > 0) return;
    
    this.dialog.open(DialogAnimationsDialog, { data: {
      title: 'Logout',
      subtitle: 'You are going to be logged out, are you sure?',
      confirmLabel: 'LOGOUT',
      cancelLabel: 'CANCEL',
      confirmAction: this.authService.logout
    }})
  }

}
