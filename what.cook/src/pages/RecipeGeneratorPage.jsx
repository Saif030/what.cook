import React, { useState , useEffect , useContext } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import {
  Send,
  RotateCcw,
  Image as ImageIcon
} from 'lucide-react';
import { logo } from '../assets/assets.js';  
import { DataContext } from '../context/DataContext.jsx';
import ResultShow from '../components/ResultShow.jsx';

export default function RecipeGeneratorPage() {
  const { aiCook, data, loading , prompt, setPrompt, handleGenerate } = useContext(DataContext);
  const recipeData = data?.response;

  const handleGenerateFromSuggestion = async (suggestion) => {
    setPrompt(suggestion);
    await aiCook(suggestion);
  };

  const suggestions = [
    'I have chicken, spinach, and cream',
    'Quick vegan dinner under 30 mins',
    'High protein breakfast ideas',
    'Italian pasta with tomatoes'
  ];

  return (
    <div className="min-h-[89vh] bg-gray-50 font-sans text-gray-800 flex flex-col">
      <div className="flex-1 max-w-4xl mx-auto w-full px-6 py-8 mt-16">
        {!loading && !recipeData ? (
          /* Initial State */
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <img src={logo} alt="Main Logo" className="h-16 mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-3">What would you like to cook?</h2>
            <p className="text-gray-500 max-w-md mb-8">
              Describe your ingredients, dietary preferences, or cravings and our AI will generate a perfect recipe for you.
            </p>

            {/* Input */}
            <form onSubmit={handleGenerate} className="w-full max-w-2xl relative mb-8">
              <div className="relative">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., I have chicken breast, broccoli, and rice. Something healthy and quick..."
                  className="w-full p-5 pr-14 bg-white border border-gray-200 rounded-3xl shadow-lg shadow-gray-100 outline-none focus:border-orange-300 focus:ring-4 focus:ring-orange-100 transition-all resize-none text-gray-700 placeholder:text-gray-400 min-h-30"
                />
                <button
                  type="submit"
                  disabled={!prompt.trim()}
                  className="absolute bottom-4 right-4 w-10 h-10 bg-linear-to-r from-orange-500 to-yellow-500 text-white rounded-xl shadow-lg shadow-orange-200 flex items-center justify-center hover:scale-110 transition-transform disabled:opacity-50 disabled:hover:scale-100"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>

            {/* Suggestions */}
            <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleGenerateFromSuggestion(s)}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-orange-300 hover:text-orange-600 hover:bg-orange-50 transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Recipe Result */
          <div className="space-y-6 pb-20">
            {/* User Prompt Bubble */}
            <div className="flex justify-end">
              <div className="max-w-[80%] bg-gray-900 text-white rounded-3xl rounded-tr-lg px-6 py-4 shadow-lg">
                <p className="text-sm leading-relaxed">{prompt}</p>
              </div>
            </div>

            {/* AI Response */}
            {loading ? (
              <div className="flex items-center justify-center w-full">
                <DotLottieReact
                  src="https://lottie.host/dcf7087b-f87a-4a3b-ba30-e44359e4d1d6/x8eHn9OCFl.lottie"
                  loop
                  autoplay
                />
              </div>
            ) : recipeData ? (
              <div className="space-y-6">
                {/* Recipe Card */}
                <ResultShow value={recipeData} prompt={prompt}/>

                {/* New Prompt */}
                <form onSubmit={handleGenerate} className="relative">
                  <div className="flex gap-3">
                    <button 
                      type="button"
                      onClick={() => { setPrompt(''); }}
                      className="px-4 py-3 bg-gray-100 text-gray-600 rounded-2xl hover:bg-gray-200 transition-colors flex items-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" /> New
                    </button>
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Ask another question or refine this recipe..."
                        className="w-full p-4 pr-12 bg-white border border-gray-200 rounded-2xl shadow-sm outline-none focus:border-orange-300 focus:ring-4 focus:ring-orange-100 transition-all"
                      />
                      <button
                        type="submit"
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-linear-to-r from-orange-500 to-yellow-500 text-white rounded-xl flex items-center justify-center hover:scale-105 transition-transform"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[40vh] text-center bg-white rounded-3xl border border-dashed border-gray-200 p-8">
                <ImageIcon className="w-10 h-10 text-gray-300 mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No recipe data available</h3>
                <p className="text-sm text-gray-500 max-w-md">
                  The generator did not return a recipe payload yet. Try submitting a new prompt, or check the API response if this keeps happening.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}