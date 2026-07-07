import { CategoryService } from './../../services/category.service';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { MealService } from '../../services/meal.service';
import { CommonModule } from '@angular/common';
import { Meal } from '../../meal';

@Component({
  selector: 'app-meal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './meal.component.html',
  styleUrl: './meal.component.css'
})
export class MealComponent {

  meals: any[] = [];
  searchQuery: string = '';
  flippedCards: { [key: number]: boolean } = {}; // Track flipped state for each card

  categories: any[] = [];
  selectedCategory: string = '';
  selectedIngredient: string = '';
  selectedArea: string = '';

  private searchTimeout: any;

  constructor(private mealService: MealService,private categoryservice:CategoryService) { }

  // searchSubject = new Subject<string>();


  ngOnInit(): void {
    this.getAllMeals();
    this.getAllCategories();

    // this.searchSubject.pipe(
    //   debounceTime(300), // Wait 300ms after typing stops
    //   distinctUntilChanged() // Only call API if input value changes
    // ).subscribe(searchText => {
    //   if (searchText.trim() === '') {
    //     this.getAllMeals();
    //   } else {
    //     this.mealService.getMealByName(searchText).subscribe((data) => {
    //       this.meals = data;
    //     });
    //   }
    // });

    // searchMeals() {
    //   this.searchSubject.next(this.searchQuery);
    // }
    
  }

  getAllMeals() {
    this.mealService.getMeals().subscribe((data) => {
      this.meals = data;
    });
  }

  searchMeals() {
    this.selectedCategory = '';
    this.selectedIngredient = '';
    this.selectedArea = '';
    clearTimeout(this.searchTimeout); // Clear the previous timeout

  this.searchTimeout = setTimeout(() => {
    if (this.searchQuery.trim() === '') {
      this.getAllMeals();
    } else {
      this.mealService.getMealByName(this.searchQuery).subscribe((data) => {
        this.meals = data;
      });
    }
  }, 300); // Delay API call by 300ms
  }

  toggleFlip(index: number) {
    this.flippedCards[index] = !this.flippedCards[index];
  }

  getAllCategories() {
    this.categoryservice.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  

  filterByCategory() {
    this.searchQuery = ''; 
    this.selectedIngredient = '';
    this.selectedArea = '';

    if (this.selectedCategory) {
      this.categoryservice.getMealsByCategory(this.selectedCategory).subscribe((data) => {
        this.meals = data;
      });
    } else {
      this.getAllMeals();
    }
  }

  filterByIngredient() {
    this.selectedCategory = '';
    this.selectedArea = '';
    this.searchQuery = '';


    if (this.selectedIngredient) {
      this.mealService.getMealsByIngredient(this.selectedIngredient).subscribe((data) => {
        this.meals = data;
      });
    } else {
      this.getAllMeals();
    }
  }

  filterByArea() {
    this.searchQuery = '';
    this.selectedCategory = '';
    this.selectedIngredient = '';

    if (this.selectedArea) {
      this.mealService.getMealsByArea(this.selectedArea).subscribe((data) => {
        this.meals = data;
      });
    } else {
      this.getAllMeals();
    }
  }
   

  applyFilters() {
    console.log('Filtering by Ingredient:', this.selectedIngredient);
    console.log('Filtering by Area:', this.selectedArea);
  
    this.searchQuery = ''; 
    this.selectedCategory = ''; 
  
    if (this.selectedIngredient || this.selectedArea) {
      this.mealService.getMeals().subscribe((meals: Meal[]) => {  
        let filteredMeals = meals;
  
        if (this.selectedIngredient) {
          filteredMeals = filteredMeals.filter((meal: Meal) =>
            [meal.strIngredient1, meal.strIngredient2, meal.strIngredient3, meal.strIngredient4, meal.strIngredient5]
              .some(ingredient => ingredient?.toLowerCase().includes(this.selectedIngredient.toLowerCase()))
          );
        }
  
        if (this.selectedArea) {
          filteredMeals = filteredMeals.filter((meal: Meal) =>
            meal.strArea?.toLowerCase() === this.selectedArea.toLowerCase()
          );
        }
  
        this.meals = filteredMeals;
      });
    } else {
      this.getAllMeals();
    }
  }
  
 
  
  
  
}


// filterMeals() {
//   let filteredMeals = this.meals; // Start with all meals

//   if (this.selectedCategory) {
//     filteredMeals = filteredMeals.filter(meal => meal.strCategory === this.selectedCategory);
//   }

//   if (this.selectedIngredient) {
//     filteredMeals = filteredMeals.filter(meal => meal.strIngredient.includes(this.selectedIngredient));
//   }

//   if (this.selectedArea) {
//     filteredMeals = filteredMeals.filter(meal => meal.strArea === this.selectedArea);
//   }

//   if (this.searchQuery.trim() !== '') {
//     filteredMeals = filteredMeals.filter(meal =>
//       meal.strMeal.toLowerCase().includes(this.searchQuery.toLowerCase())
//     );
//   }

//   this.meals = filteredMeals; // Update the displayed meals
// }
// searchMeals() {
//   this.filterMeals(); // Apply filters together
// }

// filterByCategory() {
//   this.filterMeals(); // Apply filters together
// }

// filterByIngredient() {
//   this.filterMeals(); // Apply filters together
// }

// filterByArea() {
//   this.filterMeals(); // Apply filters together
// }
