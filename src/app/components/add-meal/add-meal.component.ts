import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MealService } from '../../services/meal.service';
import { Category, Meal } from '../../meal';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-add-meal',
  standalone: true,
  imports:[FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './add-meal.component.html',
  styleUrls: ['./add-meal.component.css']
})
export class AddMealComponent implements OnInit {
  mealForm!: FormGroup;
  categories: Category[] = [];

  constructor(private fb: FormBuilder, private mealService: MealService,private CategoryService:CategoryService) {}

  ngOnInit(): void {
    // Initialize form
    this.mealForm = this.fb.group({
      strMeal: ['', [Validators.required, Validators.pattern('[a-zA-Z]'),]],
      category: ['', Validators.required], 
      strArea: [''],
      strInstructions: ['', Validators.required, Validators.minLength(1000),],
      strMealThumb: [''],
      strTags: [''],
      strYoutube: [''],
      strIngredient1: [''],
      strIngredient2: [''],
      strIngredient3: [''],
      strIngredient4: [''],
      strIngredient5: [''],
      strMeasure1: [''],
      strMeasure2: [''],
      strMeasure3: [''],
      strMeasure4: [''],
      strMeasure5: [''],
      strSource: [''],
      strImageSource: [''],
      strCreativeCommonsConfirmed: [''],
      dateModified: ['']
    });

    // Fetch categories for dropdown
    this.CategoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  addMeal() {
    if (this.mealForm.valid) {
      const meal: Meal = {
        ...this.mealForm.value,
        category: { idCategory: this.mealForm.value.category }
      };

      this.mealService.addMeal(meal).subscribe(() => {
        alert('Meal added successfully!');
        this.mealForm.reset();
      });
    }
  }
}
