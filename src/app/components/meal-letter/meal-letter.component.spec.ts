import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealLetterComponent } from './meal-letter.component';

describe('MealLetterComponent', () => {
  let component: MealLetterComponent;
  let fixture: ComponentFixture<MealLetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MealLetterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MealLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
