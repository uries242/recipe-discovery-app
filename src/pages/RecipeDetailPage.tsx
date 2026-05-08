import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useFavorites } from "../context/FavoritesContext";
import type { MealDetailResponse } from "../types";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

function RecipeDetailPage() {
  const { recipeId } = useParams<{ recipeId: string }>();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const { data, loading, error } = useFetch<MealDetailResponse>(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
  );

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  const meal = data?.meals?.[0];
  if (!meal) return <ErrorMessage message="Recipe not found." />;

  // Extract ingredients (API sends strIngredient1...strIngredient20)
  const ingredients = Array.from({ length: 20 }, (_, i) => ({
    ingredient: meal[`strIngredient${i + 1}`],
    measure: meal[`strMeasure${i + 1}`],
  })).filter(({ ingredient }) => ingredient && ingredient.trim() !== "");

  const favorited = isFavorite(meal.idMeal);

  return (
    <div className="max-w-3xl mx-auto">
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full rounded-xl mb-6 object-cover"
      />
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">{meal.strMeal}</h1>
        <button
          onClick={() =>
            favorited ? removeFavorite(meal.idMeal) : addFavorite(meal.idMeal)
          }
          className={`px-4 py-2 rounded-full font-semibold transition ${
            favorited
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {favorited ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>

      <div className="flex gap-4 mb-6 text-sm text-gray-500">
        <span>📂 {meal.strCategory}</span>
        <span>🌍 {meal.strArea}</span>
      </div>

      <h2 className="text-xl font-bold mb-2">Ingredients</h2>
      <ul className="grid grid-cols-2 gap-1 mb-6">
        {ingredients.map(({ ingredient, measure }) => (
          <li key={ingredient} className="text-sm">
            ✅ {measure} {ingredient}
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-bold mb-2">Instructions</h2>
      <p className="text-sm leading-relaxed whitespace-pre-line">
        {meal.strInstructions}
      </p>

    </div>
  );
}

export default RecipeDetailPage;