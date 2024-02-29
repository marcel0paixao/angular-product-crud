import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table'; // Import MatTableModule

import { CategoryReadComponent } from './category-read.component';

describe('CategoryReadComponent', () => {
  let component: CategoryReadComponent;
  let fixture: ComponentFixture<CategoryReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryReadComponent ],
      providers: [ MatSnackBar ],
      imports: [ HttpClientModule, MatFormFieldModule, MatTableModule ] // Import MatTableModule
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
