import { Component } from '@angular/core';
import { AddMealComponent } from '../add-meal/add-meal.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [AddMealComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
