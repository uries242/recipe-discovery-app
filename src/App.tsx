import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { FavoritesProvider } from './context/FavoritesContext';
import Navbar from "./components/Navbar"
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import FavoritesPage from "./pages/FavoritesPage";
import SearchPage from "./pages/SearchPage";
import './App.css'

function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <Navbar />
        <main className='max-w-6xl  mx-auto  px-4  py-8'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:categoryName" element={<CategoryPage />} />
            <Route path="/recipe/:recipeId" element={<RecipeDetailPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </FavoritesProvider>
  )
}

export default App
