import { Component } from '@angular/core';
import { Category } from '../category.model';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-read',
  templateUrl: './category-read.component.html',
  styleUrls: ['./category-read.component.css']
})

export class CategoryReadComponent {
  displayedColumns = ['id', 'name', 'created_at', 'action'];
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.read().subscribe(categories => {
      this.categories = categories
    })
  }
}
