import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/components/template/header/header.service';

@Component({
  selector: 'app-product-crud',
  templateUrl: './product-crud.component.html',
  styleUrls: ['./product-crud.component.css']
})
export class ProductCrudComponent {
  constructor(private headerService: HeaderService, private readonly router: Router) {
    headerService.headerData = {
      title: 'Product CRUD',
      icon: 'storefront',
      routeUrl: '/products'
    }
  }

  navigateToProductCreate(): void {
    this.router.navigate(['/products/create'])
  }
}
