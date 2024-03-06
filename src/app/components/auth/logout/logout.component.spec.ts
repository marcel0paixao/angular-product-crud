import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { LogoutComponent } from './logout.component';
import { Router } from '@angular/router';
import { HeaderService } from '../../template/header/header.service';
import { AuthService } from '../auth.service';
import { User } from '../../models/User';

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;
  let headerService: HeaderService;
  let router: Router;
  let authService: AuthService;

  beforeEach(async () => {
    // auth service mock
    const authServiceMock = jasmine.createSpyObj('AuthService', ['clearToken', 'storeUser', 'storeToken']);
    authService = authServiceMock;

    // router mock
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    router = routerMock;

    await TestBed.configureTestingModule({
      declarations: [ LogoutComponent ],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router },
        HeaderService
      ],
      imports: [ HttpClientModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const token: string = 'token';
    const UserMock: User = { id: 1, name: 'John Doe', email: 'john@tests.com' };

    authService.storeToken(token);
    authService.storeUser(UserMock);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call clearToken and redirect to login at init', () => {
    component.ngOnInit();
    expect(authService.clearToken).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
