import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import { RegisterComponent } from './register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { User } from '../../models/User';
import { HeaderService } from '../../template/header/header.service';
import { AuthService } from '../auth.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
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
  const UserMock: User = { id: 1, name: 'John Doe', email: 'john@tests.com' };
  const form = {
    name: 'John Doe',
    email: 'john@tests.com',
    password: 'password'
  };

  beforeEach(async () => {
    // auth service mock
    const authServiceMock = jasmine.createSpyObj('AuthService', ['getToken', 'getUser', 'register', 'login', 'storeToken', 'storeUser', 'clearToken', 'logout']);
    authServiceMock.getToken.and.returnValue(of(null));
    authServiceMock.login.and.returnValue(of({
      user: user,
      access_token: token
    }));
    authServiceMock.register.and.returnValue(of(true));
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
      declarations: [ RegisterComponent ],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router },
        { provide: HeaderService, useValue: headerService },
      ],
      imports: [ HttpClientModule, MatCardModule, MatIconModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, BrowserAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    authService.storeToken('token');
    authService.storeUser(UserMock);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    component.ngOnInit();
    expect(component.form).toBeDefined();
  });

  it('should redirect to login', () => {
    component.backToLogin();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  // if is logged should redirect home
  it('should redirect to home', () => {
    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalledWith(['/products']);
  });

  it('should have error messages defined', () => {
    expect(component.errorMessages).toBeDefined();
  });

  it('should have successModal set to false', () => {
    expect(component.successModal).toBe(false);
  });

  it('should initialize the form', () => {
    component.initForm();
    expect(component.form).toBeDefined();
  });

  it('should return error keys for a control', () => {
    const controlName = 'name';
    const errorKeys = component.getErrorKeys(controlName);
    expect(errorKeys).toEqual(['required']);
  });

  it('should return error message for a control and error key', () => {
    const controlName = 'name';
    const errorKey = 'required';
    const errorMessage = component.getErrorMessage(errorKey, controlName);
    expect(errorMessage).toBe('The field is required.');
  });

  it('should return true if any fields are empty', () => {
    component.form.setValue(form);
    const isEmpty = component.isAnyFieldsEmpty();
    expect(isEmpty).toBe(true);
  });

  it('should return password validation object', () => {
    component.form.setValue({...form, password: 'pass'});
    let passwordValidation = component.getPasswordValidation();
    expect(passwordValidation).toEqual({
      minlength: true,
      specialChars: false,
      lowerCase: true,
      upperCase: false
    });

    component.form.setValue({...form, password: 'Password123!'});
    passwordValidation = component.getPasswordValidation();
    expect(passwordValidation).toEqual({
      minlength: false,
      specialChars: true,
      lowerCase: true,
      upperCase: true
    });
  });

  it('should register a user', () => {
    component.form.setValue(form);

    Object.defineProperty(component.form, 'valid', {
      get: () => true
    });

    component.register();
    expect(authService.login).toHaveBeenCalled();
    expect(authService.storeToken).toHaveBeenCalledWith(token);
    expect(authService.storeUser).toHaveBeenCalledWith(UserMock);
    expect(router.navigate).toHaveBeenCalledWith(['/products']);
  });
});
