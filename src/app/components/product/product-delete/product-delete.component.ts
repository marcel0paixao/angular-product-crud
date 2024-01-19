import { Component } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent {
  product: Product = {
    id: 0,
    name: '',
    price: 0,
    created_at: new Date(),
    updated_at: new Date()
  };

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.productService.readById(id ?? "0").subscribe(product => {
      this.product = product
    })
  }

  deleteProduct(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.productService.delete(id ?? "0").subscribe(() => {
      this.productService.showMessage("Product deleted!")
      this.router.navigate(["/products"])
    })
  }

  cancel(): void {
    this.router.navigate(['/products'])
  }
}
