import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements AfterViewInit {
  displayedColumns = ['id', 'name', 'price', 'created_at', 'action'];
  products: Product[] = [];

  constructor(private productService: ProductService) {

  }
  ngAfterViewInit(): void {
    //
  }

  ngOnInit(): void {
    this.productService.read().subscribe(products => {
      this.products = products
    })
  }
}
