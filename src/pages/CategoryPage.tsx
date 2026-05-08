import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import type { MealsResponse } from "../types";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";


function CategoryPage() {
  const { categoryName } = useParams<{ categoryName: string }>();

  const { data, loading, error } = useFetch<MealsResponse>(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
  );

  if (loading) return <Spinner />
  if (error) return <ErrorMessage message={error} />

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{categoryName}</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {data?.meals?.map((meal) => (
          <Link
            to={`/recipe/${meal.idMeal}`}
            key={meal.idMeal}
            className="rounded-xl overflow-hidden shadow hover:shadow-lg transition"
          >
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full object-cover"
            />
            <div className="p-2 text-center font-semibold">{meal.strMeal}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
export default CategoryPage;
