import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { NavComponent } from './nav.component';
import { AuthService } from '../../auth/auth.service';
import { DialogAnimationsDialog } from '../../dialogs/dialog-animations/dialog-animations.component';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let authService: AuthService;
  let dialog: MatDialog;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavComponent ],
      imports: [ HttpClientModule, MatDialogModule, MatSidenavModule, BrowserAnimationsModule, MatListModule, RouterModule ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => 'mockedParamValue' 
              }
            }
          }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    dialog = TestBed.inject(MatDialog);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get token from AuthService', () => {
    authService.storeToken('token');
    spyOn(authService, 'getToken').and.returnValue('token');
    const result = component.getToken();
    expect(result).toBeTruthy()
    expect(authService.getToken).toHaveBeenCalled();
  });

  it('should select item', () => {
    const item = 'home';
    component.selectItem(item);
    expect(component.item).toBe(item);
  });

  it('should open logout dialog', () => {
    spyOn(dialog, 'open').and.returnValue({ afterClosed: () => of(true) } as any);
    spyOn(router, 'navigateByUrl');
    component.openLogout();
    expect(dialog.open).toHaveBeenCalledWith(DialogAnimationsDialog, { data: {
      title: 'Logout',
      subtitle: 'You are going to be logged out, are you sure?',
      confirmLabel: 'LOGOUT',
      cancelLabel: 'CANCEL',
      confirmAction: authService.logout
    }});
  });

  it('should not open logout dialog if there is already one open', () => {
    component.openLogout();
    component.openLogout();
    expect(component.dialog.openDialogs.length).toBe(1);
  });
});
