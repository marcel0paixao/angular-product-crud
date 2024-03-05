import { Component } from '@angular/core';
import { Category } from '../category.model';
import { CategoryService } from '../category.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-delete',
  templateUrl: './category-delete.component.html',
  styleUrls: ['./category-delete.component.css']
})
export class CategoryDeleteComponent {
  category: Category = {
    id: 0,
    name: '',
    user_id: 1,
    created_at: new Date(),
    updated_at: new Date()
  };

  constructor(private categoryService: CategoryService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.categoryService.readById(id!).subscribe(category => {
      this.category = category
    })
  }

  deleteCategory(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.categoryService.delete(id!).subscribe(() => {
      this.categoryService.showMessage("Category deleted!")
      this.router.navigate(["/categories"])
    })
  }

  cancel(): void {
    this.router.navigate(['/categories'])
  }
}
