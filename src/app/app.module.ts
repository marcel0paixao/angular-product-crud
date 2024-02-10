import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatListModule } from '@angular/material/list'
import { MatButtonModule } from '@angular/material/button'
import { MatSnackBarModule } from '@angular/material/snack-bar'

import { HeaderComponent } from './components/template/header/header.component';
import { FooterComponent } from './components/template/footer/footer.component';
import { NavComponent } from './components/template/nav/nav.component';
import { HomeComponent } from './views/home/home.component';

import { RedDirective } from './directives/red.directive';
import { ForDirective } from './directives/for.directive';

import {
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatDialogModule
} from '@angular/material/dialog';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

import localePt from '@angular/common/locales/pt'
import { registerLocaleData } from '@angular/common';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AuthInterceptor } from './components/auth/auth-interceptor.service';
import { LogoutComponent } from './components/auth/logout/logout.component';

import { ProductUpdateComponent } from './components/product/product-update/product-update.component';
import { ProductDeleteComponent } from './components/product/product-delete/product-delete.component';
import { ProductReadComponent } from './components/product/product-read/product-read.component';
import { ProductCrudComponent } from './views/product-crud/product-crud.component';
import { ProductCreateComponent } from './components/product/product-create/product-create.component';

import { CategoryCreateComponent } from './components/category/category-create/category-create.component';
import { DialogAnimationsDialog } from './components/dialogs/dialog-animations/dialog-animations.component';
import { CategoryCrudComponent } from './views/category-crud/category-crud.component';
import { CategoryReadComponent } from './components/category/category-read/category-read.component';
import { CategoryUpdateComponent } from './components/category/category-update/category-update.component';
import { CategoryDeleteComponent } from './components/category/category-delete/category-delete.component';

registerLocaleData(localePt)

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    HomeComponent,
    ProductCrudComponent,
    RedDirective,
    ForDirective,
    ProductCreateComponent,
    ProductCrudComponent,
    ProductReadComponent,
    ProductUpdateComponent,
    ProductDeleteComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    DialogAnimationsDialog,
    CategoryCreateComponent,
    CategoryCrudComponent,
    CategoryReadComponent,
    CategoryUpdateComponent,
    CategoryDeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDividerModule, 
    MatIconModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'en-US'
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS, 
      useValue: {
        hasBackdrop: false
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
