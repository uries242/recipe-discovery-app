import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { FavoritesProvider } from './context/FavoritesContext';
import Navbar from "./components/Navbar"
import CategoryPage from "./pages/CategoryPage.tsx";
import RecipeDetailPage from "./pages/RecipeDetailPage.tsx";
import FavoritesPage from "./pages/FavoritesPage.tsx";
import SearchPage from "./pages/SearchPage.tsx";
import HomePage from './pages/Home';
import './App.css'

function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <Navbar />
        <main className='max-w-6xl  mx-auto  px-4  py-8'>
          <Routes>
            <Route path="/" element={<HomePage/>} />
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
