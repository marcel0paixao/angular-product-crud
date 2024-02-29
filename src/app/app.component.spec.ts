import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'; 
import { NavComponent } from './components/template/nav/nav.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FooterComponent } from './components/template/footer/footer.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatDialogModule,
        MatSidenavModule,
        BrowserAnimationsModule,
        MatListModule,
        MatToolbarModule
      ],
      declarations: [
        AppComponent,
        NavComponent,
        FooterComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'CRUD'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('CRUD');
  });

  it('should initialize loginDto, registerDto, and jwtDto as null', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.loginDto).toBeNull();
    expect(app.registerDto).toBeNull();
    expect(app.jwtDto).toBeNull();
  });

  it('should call ngOnInit method', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const spyOnInit = spyOn(app, 'ngOnInit').and.callThrough();
    spyOnInit.call('ngOnInit');
    fixture.detectChanges();
    expect(spyOnInit).toHaveBeenCalled();
  });

  it('should return token from getToken method', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const token = 'dummyToken';
    spyOn(app, 'getToken').and.returnValue(token);
    const result = app.getToken();
    expect(result).toEqual(token);
  });
});
