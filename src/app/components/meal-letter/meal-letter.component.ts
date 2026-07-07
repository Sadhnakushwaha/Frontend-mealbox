import { Component } from '@angular/core';
import { MealService } from '../../services/meal.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-meal-letter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meal-letter.component.html',
  styleUrl: './meal-letter.component.css'
})
export class MealLetterComponent {
  Meals: any[] = [];
  letters: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  selectedLetter: string = ''; // Track selected letter

  constructor(private mealService: MealService, private router: Router) {}

  ngOnInit(): void {
    // this.getAllMeals();
  }

  getAllMeals() {
    this.mealService.getMeals().subscribe((data) => {
      this.Meals = data;
    });
  }

   // ✅ Fetch meals by letter
   searchByLetter(letter: string) {
    if (this.selectedLetter === letter ) {
      // If the same letter is clicked again, clear the meals
      this.Meals = [];
      this.selectedLetter = '';

     } else {
    // Otherwise, fetch meals for the new letter
    this.selectedLetter = letter;
    this.mealService.getMealsByLetter(letter).subscribe((data) => {
      this.Meals = data.length ? data : []; // Ensure empty array if no data
    }, error => {
      this.Meals = [];
    });
  }

     // ✅ Redirect to recipes page with letter as query parameter
    //  this.router.navigate(['/recipes'], { queryParams: { letter: letter } });
  }

  // ✅ Redirect to meal details page
  moreInfo(meal: any) {
    this.router.navigate(['/meal-detail', meal.idMeal]); 
  }
}
