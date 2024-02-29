import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from '../../components/template/header/header.service';

@Component({
  selector: 'app-category-crud',
  templateUrl: './category-crud.component.html',
  styleUrls: ['./category-crud.component.css']
})

export class CategoryCrudComponent {
  constructor(private headerService: HeaderService, private readonly router: Router) {
    headerService.headerData = {
      title: 'Category CRUD',
      icon: 'category',
      routeUrl: '/categories'
    }
  }

  navigateToCategoryCreate(): void {
    this.router.navigate(['/categories/create'])
  }
}
