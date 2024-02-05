import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './views/home/home.component'
import { ProductCrudComponent } from './views/product-crud/product-crud.component'
import { ProductCreateComponent } from './components/product/product-create/product-create.component'
import { ProductUpdateComponent } from './components/product/product-update/product-update.component';
import { ProductDeleteComponent } from './components/product/product-delete/product-delete.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AuthGuard } from './components/auth/guards/auth.guard';
import { LogoutComponent } from './components/auth/logout/logout.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "logout",
    component: LogoutComponent
  },
  {
    path: "products",
    component: ProductCrudComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "products/create",
    component: ProductCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "products/update/:id",
    component: ProductUpdateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "products/delete/:id",
    component: ProductDeleteComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
