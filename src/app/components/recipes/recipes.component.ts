import { CommonModule } from '@angular/common';
import { MealService } from './../../services/meal.service';
import { MealComponent } from './../meal/meal.component';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent implements OnInit {


  Meals:any[]=[];
  categories: any[] = [];

  constructor(private mealservice: MealService,private categoryservice:CategoryService , private route:Router,private ar: ActivatedRoute){

  }

  ngOnInit(): void{
    // this.ar.queryParams.subscribe(params => {
    //   const letter = params['letter'];
    //   if (letter) {
    //     this.getMealsByLetter(letter);
    //   }
    // });
    this.getAllMeals();
   
  }
  

  getAllMeals(){
    this.mealservice.getMeals().subscribe((data)=>{
      this.Meals=data;
    })
  }


  
  moreInfo(meal: any) {
    this.route.navigate(['/meal-detail', meal.idMeal]); 
  }

}
