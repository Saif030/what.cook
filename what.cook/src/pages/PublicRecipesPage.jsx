import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ChefHat,
  Flame,
  Clock,
  Leaf,
  Wheat,
  Beef,
  Fish,
  Apple
} from 'lucide-react';
import { useContext } from 'react';
import { DataContext } from '../context/DataContext';

export default function PublicRecipesPage() {
  const { fetchAllRecipes , allRecipes } = useContext(DataContext);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    { name: 'All', icon: <ChefHat className="w-4 h-4" /> },
    { name: 'Vegan', icon: <Leaf className="w-4 h-4" /> },
    { name: 'Vegetarian', icon: <Apple className="w-4 h-4" /> },
    { name: 'Keto', icon: <Beef className="w-4 h-4" /> },
    { name: 'Gluten-Free', icon: <Wheat className="w-4 h-4" /> },
    { name: 'Seafood', icon: <Fish className="w-4 h-4" /> },
  ];

  const categoryColors = [
    { name: 'All', icon: <ChefHat key="all" className="w-12 h-12 text-gray-200" />  },
    { name: 'Vegan', icon: <Leaf key="vegan" className="w-12 h-12 text-green-200" /> },
    { name: 'Vegetarian', icon: <Apple key="vegetarian" className="w-12 h-12 text-green-200" /> },
    { name: 'Keto', icon: <Beef key="keto" className="w-12 h-12 text-purple-200" /> },
    { name: 'Gluten-Free', icon: <Wheat key="gluten-free" className="w-12 h-12 text-yellow-200" /> },
    { name: 'Seafood', icon: <Fish key="seafood" className="w-12 h-12 text-blue-200" /> },
  ];

  const filteredRecipes = activeCategory === 'All'
    ? allRecipes?.rows || []
    : allRecipes?.rows?.filter(r => r.category?.toLowerCase() === activeCategory.toLowerCase()) || [];

  useEffect(() => {
    fetchAllRecipes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-8 mt-16">
        {/* Hero */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Discover Recipes</h1>
          <p className="text-gray-500 max-w-lg mx-auto">Explore community-created recipes, filter by dietary needs, and find your next favorite meal.</p>
        </div>

        {/* Search & Filter */}
        <div className="max-w-3xl mx-auto mb-8">
          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat.name
                    ? 'bg-gray-900 text-white shadow-lg'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-orange-300 hover:text-orange-600'
                }`}
              >
                {cat.icon}
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">
            Showing <span className="font-semibold text-gray-900">{allRecipes?.rows?.length}</span> recipes
          </p>
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredRecipes.map((recipe) => (
            <div key={recipe.$id} className="group bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1 transition-all duration-300">
              {/* Image Area */}
              <div className={`h-48 relative flex items-center justify-center`}>
                {categoryColors.map((cat) => cat.name.toLowerCase() === recipe.category.toLowerCase() && cat.icon)}
                <span className={`absolute bottom-3 left-3 px-2.5 py-1 rounded-lg text-xs font-bold bg-gray-100`}>
                  {recipe.category}
                </span>
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-orange-600 cursor-pointer transition-colors">{recipe.prompt.slice(0, 50)}{recipe.prompt.length > 50 ? '...' : ''}</h3>
                <p className="text-xs text-gray-400 mb-3">by {recipe.userId.username}</p>
                
                <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1"><Flame className="w-3.5 h-3.5" /> {recipe.calories}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {recipe.time_require}</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <Link to={`/recipe/${recipe.$id}`} className="text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors">
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-white border border-gray-200 text-gray-700 font-semibold rounded-2xl hover:border-orange-300 hover:text-orange-600 transition-all">
            Load More Recipes
          </button>
        </div>
      </div>
    </div>
  );
}