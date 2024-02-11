import { Component } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../category/category.service';
import { Category } from '../../category/category.model';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})

export class ProductDeleteComponent {
  constructor(private productService: ProductService, private categoryService: CategoryService, private router: Router, private route: ActivatedRoute) {}

  product: Product = {
    id: 0,
    name: '',
    price: 0,
    user_id: 0,
    category_id: 0,
    created_at: new Date(),
    updated_at: new Date()
  };

  category!: Category;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.productService.readById(id!).subscribe(product => {
      this.product = product;
      this.categoryService.readById(product.category_id.toString()).subscribe(category => this.category = category);
    })
  }

  deleteProduct(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.productService.delete(id!).subscribe(() => {
      this.productService.showMessage("Product deleted!")
      this.router.navigate(["/products"])
    })
  }

  cancel(): void {
    this.router.navigate(['/products'])
  }
}
