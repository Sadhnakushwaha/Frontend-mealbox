import { Component, OnInit } from '@angular/core';
import { MealService } from '../../services/meal.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-meal-detail',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './meal-detail.component.html',
  styleUrl: './meal-detail.component.css'
})
export class MealDetailComponent implements OnInit{
  meal: any;
  editMode: boolean = false;

  constructor(private route: ActivatedRoute,private mealservice:MealService , private sanitizer:DomSanitizer){

  }

  ngOnInit():void{
    const mealId = this.route.snapshot.paramMap.get('id');
    if (mealId) {
      this.mealservice.getMealById(mealId).subscribe((data) => {
        this.meal = data;
      });
    }
  }

  getSafeUrl(youtubeUrl: string): SafeResourceUrl {
    const embedUrl = youtubeUrl.replace("watch?v=", "embed/");
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

   // Toggle edit mode
   toggleEditMode() {
    this.editMode = !this.editMode;
  }

  // Update meal details
  updateMeal() {
    if (this.meal.idMeal) {
      this.mealservice.updateMeal(this.meal.idMeal, this.meal).subscribe(
        (updatedMeal) => {
          this.meal = updatedMeal;
          this.editMode = false;
          alert('Meal updated successfully!');
        },
        (error) => {
          console.error('Update failed:', error);
          alert('Failed to update the meal.');
        }
      );
    }

}

// Delete meal
deleteMeal() {
  if (confirm('Are you sure you want to delete this meal?')) {
    this.mealservice.deleteMeal(this.meal.idMeal).subscribe(
      () => {
        alert('Meal deleted successfully!');
        // Optionally, navigate away after deletion
      },
      (error) => {
        console.error('Delete failed:', error);
        alert('Failed to delete the meal.');
      }
    );
  }
}

}
