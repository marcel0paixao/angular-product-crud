import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})

export class ProductCreateComponent {
  constructor(private productService: ProductService, private router: Router) {}

  product: Product = {
    name: '',
    price: 0,
    id: 0,
    created_at: new Date(),
    updated_at: new Date()
  }

  createProduct(): void {
    this.productService.create(this.product).subscribe(() => {
      this.router.navigate(['/products'])
      this.productService.showMessage('Sucessfully operation!')
    })
  }

  cancel(): void {
    this.router.navigate(['/products'])
  }
}
