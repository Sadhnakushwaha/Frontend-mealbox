export interface Category {
    idCategory: number;
    strCategory?: string;
     strCategoryDescription:string;
    strCategoryThumb:string;
  }
  
  export interface Meal {
    idMeal?: number;
    strMeal: string;
    category: Category;
    strArea: string;
    strInstructions: string;
    strMealThumb: string;
    strTags?: string;
    strYoutube?: string;
    strIngredient1?: string;
    strIngredient2?: string;
    strIngredient3?: string;
    strIngredient4?: string;
    strIngredient5?: string;
    strMeasure1?: string;
    strMeasure2?: string;
    strMeasure3?: string;
    strMeasure4?: string;
    strMeasure5?: string;
    strSource?: string;
    strImageSource?: string;
    strCreativeCommonsConfirmed?: string;
    dateModified?: string;
  }
  