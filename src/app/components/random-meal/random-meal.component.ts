import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealService } from '../../services/meal.service';
import { Router } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-random-meal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './random-meal.component.html',
  styleUrls: ['./random-meal.component.css']
})
export class RandomMealComponent implements OnInit {
  randomMeals: any[] = [];

  constructor(private mealService: MealService,private router:Router) {}

  ngOnInit(): void {
    this.getRandomMeals();
  }

  getRandomMeals(): void {
    this.mealService.getrandomMeals().subscribe((data) => {
      console.log("Random Meals:", data); // Debugging
      this.randomMeals = data;
    },
    (error)=>{
      
      console.log("Error fetching random meals:",error);
    }
  );
  }

  moreInfo(meal: any) {
    this.router.navigate(['/meal-detail', meal.idMeal]); 
  }
}
