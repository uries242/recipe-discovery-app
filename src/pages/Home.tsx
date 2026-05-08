import useFetch from "../hooks/useFetch";
import type { CategoriesResponse } from "../types";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

function HomePage() {
  const { data, loading, error } = useFetch<CategoriesResponse>(
    "https://www.themealdb.com/api/json/v1/1/categories.php",
  );

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <h1 className="text-3xl  text-center  font-bold  mb-6">Browse Categories</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {data?.categories.map((category) => (
          <Link
            to={`/category/${category.strCategory}`}
            key={category.idCategory}
            className="rounded-xl overflow-hidden shadow hover:shadow-lg transition"
          >
            <img
              src={category.strCategoryThumb}
              alt={category.strCategory}
              className="w-full object-cover"
            />

            <div className="p-2 text-center font-semibold">
              {category.strCategory}
            </div>

          </Link>
        ))}
      </div>
    </div>
  );
}
export default HomePage;
