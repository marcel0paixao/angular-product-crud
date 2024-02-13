import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/components/auth/auth.service';
import { CategoryService } from 'src/app/components/category/category.service';
import { User } from 'src/app/components/models/User';
import { ProductService } from 'src/app/components/product/product.service';
import { HeaderService } from 'src/app/components/template/header/header.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(
    private headerService: HeaderService, 
    private authService: AuthService, 
    private productService: ProductService, 
    private categoryService: CategoryService, 
    private router: Router) {
    headerService.headerData = {
      title: 'Home',
      icon: 'home',
      routeUrl: '/'
    }
  }

  ngOnInit(): void {
    if (this.token) this.user = this.authService.getUser();

    if(this.user) {      
      this.categoryService.read().subscribe(categories => {
        this.categoriesLength = categories.length;
      });
  
      this.productService.read().subscribe(products => {
        this.productsLength = products.length;
      });
    }

    const breakpoints = Object.keys(this.gridColsByWindowSize).map(Number);
    const closestBreakpoint = breakpoints.reduce((a, b) => Math.abs(b - window.innerWidth) < Math.abs(a - window.innerWidth) ? b : a);
    this.breakpoint = this.gridColsByWindowSize[closestBreakpoint];
  }

  gridColsByWindowSize: any = {
    500: 1,
    700: 2,
    900: 3,
    1000: 3,
    1200: 4
  }

  token: string | null = this.authService.getToken();
  user: User | null = null;
  categoriesLength: number = 0;
  productsLength: number = 0;
  breakpoint!: number;
  
  onResize(event: any) {
    const breakpoints = Object.keys(this.gridColsByWindowSize).map(Number);
    const closestBreakpoint = breakpoints.reduce((a, b) => Math.abs(b - event.target.innerWidth) < Math.abs(a - event.target.innerWidth) ? b : a);
    this.breakpoint = this.gridColsByWindowSize[closestBreakpoint];
  }

  login(): void {
    this.router.navigate(['/login'])
  }

  products(): void {
    this.router.navigate(['/products'])
  }

  categories(): void {
    this.router.navigate(['/categories'])
  }
}
