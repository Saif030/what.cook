import React, { useState } from 'react';
import { 
  Bookmark,
  X, 
  Flame, 
  Clock, 
  ArrowRight, 
  Trash2, 
  UtensilsCrossed
} from 'lucide-react';
import { Link } from 'react-router-dom';


export default function LikedRecipesPage({ isOpen, onClose , userLikedRecipes }) {
  const [recipes, setRecipes] = useState(userLikedRecipes?.rows || []);
  const [removingId, setRemovingId] = useState(null);

  const handleRemove = (id) => {
    setRemovingId(id);
    setTimeout(() => {
      setRecipes(prev => prev.filter(r => r.id !== id));
      setRemovingId(null);
    }, 300);
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-gray-900/20 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Floating Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white shadow-2xl shadow-orange-100/30 z-50 transform transition-transform duration-500 ease-in ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-yellow-400 to-green-400" />

        {/* Header */}
        <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-orange-50 px-6 py-5 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
                <Bookmark className="w-5 h-5 text-red-500 fill-red-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Saved Recipes</h2>
                <p className="text-xs text-gray-400 font-medium">{recipes.length} saved recipes</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-gray-50 hover:bg-orange-50 flex items-center justify-center transition-colors group"
            >
              <X className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto h-[calc(100%-80px)] px-4 py-4 space-y-3">
          {recipes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center mb-4">
                <Bookmark className="w-10 h-10 text-orange-300" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">No Saved recipes yet</h3>
              <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
                Start exploring recipes and tap the bookmark icon to save your favorites here.
              </p>
              <Link
                to="/public-recipes"
                className="mt-6 px-6 py-2.5 bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-sm font-semibold rounded-full shadow-lg shadow-orange-200 hover:shadow-orange-300 hover:scale-105 transition-all flex items-center gap-2"
              >
                Explore Recipes <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            recipes.map((recipe) => (
              <Link
                key={recipe.$id}
                to={`/recipe/${recipe?.recipeId?.$id}`}
                className={`group relative cursor-pointer bg-white border border-gray-100 rounded-2xl p-3 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-100/50 transition-all duration-300 ${
                  removingId === recipe.$id ? 'opacity-0 translate-x-8 scale-95' : 'opacity-100'
                }`}
              >
                <div className="flex gap-3">
                  {/* Image placeholder */}
                  {recipe.recipeId?.image_url ? (
                    <img 
                      src={recipe.recipeId.image_url} 
                      alt={recipe.recipeId.prompt}
                      className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <UtensilsCrossed className="w-8 h-8 text-gray-300" />
                    </div>
                  )}

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-bold text-gray-900 truncate group-hover:text-orange-600 transition-colors">
                        {recipe.recipeId?.prompt}
                      </h3>
                      <button 
                        onClick={() => handleRemove(recipe.recipeId?.$id)}
                        className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-red-50 text-gray-300 hover:text-red-500 transition-all flex-shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 text-orange-400" />
                        {recipe.recipeId?.calories} kcal
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-yellow-500" />
                        {recipe.recipeId?.time_require}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Hover action */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/0 via-orange-500/0 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </Link>
            ))
          )}
        </div>
      </div>
    </>
  );
}