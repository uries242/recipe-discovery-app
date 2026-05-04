export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export interface RecipeSummary {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export interface RecipeDetail {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strYoutube: string;
  [key: string]: string | null; // Ingredients & measures come back as strIngredient1...strIngredients
}

// API response to wrappers
export interface CategoriesResponse {
  categories: Category[];
}

export interface MealsResponse {
  meals: RecipeSummary[] | null;
}

export interface MealDetailResponse {
  meals: RecipeDetail[] | null;
}

