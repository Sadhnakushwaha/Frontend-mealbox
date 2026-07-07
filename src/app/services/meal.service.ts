import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Meal } from '../meal';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  private baseurl = 'http://localhost:8080/api/meals';

  constructor(private httpClient:HttpClient) { }

  getMeals():Observable<any>{
    return this.httpClient.get(`${this.baseurl}`);
  }

  getMealById(id: string): Observable<any> {
    return this.httpClient.get<any>(`${this.baseurl}/${id}`);
  }

  getMealByName(name:string):Observable<any>{
    return this.httpClient.get(`${this.baseurl}/search?name=${name}`);
  }

  getMealsByLetter(letter: string): Observable<any> {
    return this.httpClient.get(`${this.baseurl}/letter?letter=${letter}`);
  }

  getrandomMeals():Observable<any>{
    return this.httpClient.get(`${this.baseurl}/random/5`);

  }

  getMealsByIngredient(ingredient: string): Observable<any> {
    return this.httpClient.get(`${this.baseurl}/filter-by-ingredient?ingredient=${ingredient}`);
  }

  getMealsByArea(area: string): Observable<any> {
    return this.httpClient.get(`${this.baseurl}/filter-by-area?area=${area}`);
  }

  // Add a new meal
  addMeal(meal: Meal): Observable<Meal> {
    return this.httpClient.post<Meal>(this.baseurl, meal);
  }

  updateMeal(id: number, meal: Meal): Observable<Meal> {
    return this.httpClient.put<Meal>(`${this.baseurl}/${id}`, meal);
  }
  

  deleteMeal(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseurl}/${id}`).pipe(
      catchError(error => {
        console.error('Error deleting meal:', error);
        return throwError(() => new Error('Failed to delete meal'));
      })
    );
  }
  

  
}
