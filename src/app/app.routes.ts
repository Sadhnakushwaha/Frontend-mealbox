import { Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { MealComponent } from './components/meal/meal.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { MealDetailComponent } from './components/meal-detail/meal-detail.component';
import { AboutComponent } from './components/about/about.component';
import { AddMealComponent } from './components/add-meal/add-meal.component';

export const routes: Routes = [
    
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'meals', component: MealComponent},
    {path: 'recipes', component: RecipesComponent},
    {path: 'meal-detail/:id', component: MealDetailComponent},
    { path: 'add-meal', component: AddMealComponent }, 
    {
        path:'about',component:AboutComponent
    }

];
