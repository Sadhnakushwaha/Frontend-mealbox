import { MealService } from './../../services/meal.service';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MealLetterComponent } from '../meal-letter/meal-letter.component';
import { RandomMealComponent } from '../random-meal/random-meal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,MealLetterComponent,RandomMealComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  categories: any[] = [];
  meals: any[] = [];
  randomMeals: any[] = [];
  selectedCategory: string = '';

  constructor(private categoryService: CategoryService, private Mealservice: MealService, private router: Router) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });

   
  }

  fetchMeals(category: string): void {
    if (this.selectedCategory === category) {
      
      this.meals = [];
      this.selectedCategory = '';
    } else {
      
      this.selectedCategory = category;
      this.categoryService.getMealsByCategory(category).subscribe((data) => {
        this.meals = data;
      });
    }
  }

  moreInfo(meal: any) {
    this.router.navigate(['/meal-detail', meal.idMeal]); 
  }
}
