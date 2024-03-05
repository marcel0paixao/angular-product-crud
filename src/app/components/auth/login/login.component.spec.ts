import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../auth.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HeaderService } from '../../template/header/header.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { User } from '../../models/User';
import { of } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let fb: FormBuilder;
  let headerService: HeaderService;
  let router: Router;

  const user: User = {
    id: 1,
    name: 'User 1',
    email: 'test@test.test',
  }

  const token: string = 'token';

  beforeEach(async () => {
    // auth service mock
    const authServiceMock = jasmine.createSpyObj('AuthService', ['getToken', 'getUser', 'login', 'storeToken', 'storeUser', 'clearToken', 'logout']);
    authServiceMock.getToken.and.returnValue(of(null));
    authServiceMock.login.and.returnValue(of({
      user: user,
      access_token: token
    }));
    authServiceMock.getUser.and.returnValue(of(null));
    authService = authServiceMock;

    // router mock
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    router = routerMock;

    // header service mock
    const headerServiceMock = jasmine.createSpyObj('HeaderService', ['headerData']);
    headerService = headerServiceMock;

    // form builder mock
    const fbMock = jasmine.createSpyObj('FormBuilder', ['group']);
    fb = fbMock;

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        HeaderService,
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router },
        { provide: HeaderService, useValue: headerService }
      ],
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        MatFormFieldModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    component.ngOnInit();
    expect(component.form).toBeDefined();
  });

  it('should switch forms', () => {
    component.registerForm = true;
    component.switchForms();
    expect(component.registerForm).toBe(false);

    component.registerForm = false;
    component.switchForms();
    expect(component.registerForm).toBe(true);
  });

  it('should get the token', () => {
    authService.storeToken('token');
    const token = component.getToken();
    expect(token).toBe(token);
  });

  it('should return the error keys for a control', () => {
    const controlName = 'email';
    const errorKeys = component.getErrorKeys(controlName);
    component.form.setValue({ email: 'test', password: 'test' });
    
    expect(errorKeys).toEqual(['required']);
  });

  it('should return the error message for a specific error key and control', () => {
    const controlName = 'email';
    const errorKey = 'required';
    const errorMessage = component.getErrorMessage(errorKey, controlName);
    expect(errorMessage).toEqual('This field is required.');
  });

  it('should redirect to home', () => {
    authService.storeToken(token);
    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should not permit to access login page if user is already logged in', () => {
    authService.storeToken(token);
    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should not permit login if form is invalid', () => {
    component.form.setValue({ email: '', password: '' });
    component.login();
    expect(authService.login).not.toHaveBeenCalled();
  });

  it('should initialize form', () => {
    expect(component.form).toBeDefined();
    expect(component.form.get('email')).toBeDefined();
    expect(component.form.get('password')).toBeDefined();
  });

  it('should perform login', () => {
    authService.clearToken();
    component.form.setValue({ email: 'test@test.test', password: 'test' });

    Object.defineProperty(component.form, 'valid', {
      get: () => true
    });

    component.login();
    expect(authService.login).toHaveBeenCalled();
    expect(authService.storeToken).toHaveBeenCalledWith(token);
    expect(authService.storeUser).toHaveBeenCalledWith(user);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
