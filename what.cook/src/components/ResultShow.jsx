import {
  Sparkles,
  Flame,
  Clock,
  Leaf,
  ChefHat,
  Apple,
  Wheat,
  Fish,
  Bookmark,
  Beef,
  ListOrdered,
  Image as ImageIcon,
  Upload,
  Save
} from 'lucide-react';
import { useContext, useState, useCallback, useEffect } from 'react';
import { DataContext } from '../context/DataContext';
import { AuthContext } from '../context/AuthContext';
import Loader from "./Loader.jsx";


const ResultShow = ({value}) => {
    const { user } = useContext(AuthContext);
    const { postSaved , loading , handleImageUpload , isRecipeSaved , recipeSaved } = useContext(DataContext);
    const [file , setFile] = useState(null);
    const { $id , prompt , calories, dish_name, aiResponse : steps, carbs, protein, fat, ingredients = [], time_require , category , image_url , userId } = value || {};
    const categories = [
      { name: 'All', icon: <ChefHat className="w-4 h-4 text-orange-300" /> },
      { name: 'Vegan', icon: <Leaf className="w-4 h-4 text-green-300" /> },
      { name: 'Vegetarian', icon: <Apple className="w-4 h-4 text-green-300" /> },
      { name: 'Keto', icon: <Beef className="w-4 h-4 text-red-300" /> },
      { name: 'Gluten-Free', icon: <Wheat className="w-4 h-4 text-yellow-300" /> },
      { name: 'Seafood', icon: <Fish className="w-4 h-4 text-blue-300" /> },
    ];

    const toggle = async () => {
      await postSaved($id);
      await isRecipeSaved($id);
    }

    useEffect(() => {
      if($id) {
        isRecipeSaved($id);
      }
    }, [$id]);

    const categoryIcon = categories.find((cat) => cat.name.toLowerCase() === category?.toLowerCase())?.icon;

    if(loading){
      return (
          <Loader />
      );
    }

    const handleImageChange = async () => {
      if(!file) return;
      await handleImageUpload($id, file);
      setFile(null);

    }

    return (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Image Placeholder */}
            <div className="h-64 bg-linear-to-br from-orange-50 via-yellow-50 to-white flex items-center justify-center relative">
                {image_url || file ? <img src={file ? URL.createObjectURL(file) : image_url} alt="Recipe" className="w-full h-full object-cover" /> : <ImageIcon className="w-16 h-16 text-gray-300" />}
                <div className="absolute top-4 right-4 flex gap-2">
                  { user.$id === userId && (
                    <>
                      <div className="p-2 bg-white/90 backdrop-blur rounded-full text-gray-700 hover:bg-white transition-colors">
                        <label htmlFor="image-upload" className="cursor-pointer">
                          <input type="file" id="image-upload" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
                          <Upload className="w-5 h-5" />
                        </label>
                      </div>
                      {file && (
                        <div className="p-2 bg-white/90 backdrop-blur rounded-full text-gray-700 hover:bg-white transition-colors">
                          <Save className="w-5 h-5" onClick={handleImageChange} />
                        </div>
                      )}
                    </>
                  )}
                </div>
                    <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                      <span className="px-3 py-1.5 bg-white/90 backdrop-blur rounded-full text-xs font-bold text-gray-700 flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 text-orange-500" /> {calories} cal
                      </span>
                      <span className="px-3 py-1.5 bg-white/90 backdrop-blur rounded-full text-xs font-bold text-gray-700 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-yellow-500" /> {time_require}
                      </span>
                      <span className="px-3 py-1.5 bg-white/90 backdrop-blur rounded-full text-xs font-bold text-gray-700 flex items-center gap-1">
                        {categories.map((items,idx) => (
                          items.name.toLowerCase() === category?.toLowerCase() && (
                            <div key={idx} className="flex items-center gap-1">
                              {items.icon}
                              {items.name}
                            </div>
                          )
                        ))}
                      </span>
                    </div>
            </div>

            <div className="p-6 md:p-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{dish_name}</h2>
                    <p className="text-gray-500 mb-6 leading-relaxed">{prompt}</p>

                    {/* Meta Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                      {[
                        { label: 'Cook Time', value: time_require, icon: <Flame className="w-4 h-4" /> },
                        { label: 'Calories', value: `${calories}`, icon: <Sparkles className="w-4 h-4" /> },
                      ].map((meta, i) => (
                        <div key={i} className="p-3 rounded-2xl bg-gray-50 border border-gray-100 flex items-center gap-3">
                          <div className="text-orange-500">{meta.icon}</div>
                          <div>
                            <div className="text-xs text-gray-400">{meta.label}</div>
                            <div className="font-semibold text-gray-900">{meta.value}</div>
                          </div>
                        </div>
                      ))}
                      <div onClick={toggle} className={`p-3 cursor-pointer bg-gray-50 border border-gray-100 rounded-2xl flex items-center gap-3 ${recipeSaved ? 'bg-red-50 border-red-200' : ''}`}>
                        <div className="text-orange-500"><Bookmark className="w-4 h-4"/></div>
                        <div>
                          <div className="text-xs text-gray-400">{recipeSaved ? 'Saved' : 'BookMark'}</div>
                        </div>
                        
                      </div>
                    </div>

                    {/* Macros */}
                    <div className="flex flex-wrap gap-4 mb-8 p-4 bg-linear-to-r from-orange-50 to-yellow-50 rounded-2xl border border-orange-100">
                      {[
                        { label: 'Protein', value: protein, color: 'text-orange-600' },
                        { label: 'Carbs', value: carbs, color: 'text-yellow-600' },
                        { label: 'Fats', value: fat, color: 'text-green-600' },
                      ].map((macro, i) => (
                        <div key={i} className="flex-1 min-w-[80px] text-center">
                          <div className={`text-lg font-bold ${macro.color}`}>{macro.value}</div>
                          <div className="text-xs text-gray-500">{macro.label}</div>
                        </div>
                      ))}
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Ingredients */}
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                          {categoryIcon} Ingredients
                        </h3>
                        {ingredients.length > 0 ? (
                          <ul className="space-y-2.5">
                            {ingredients.map((ing, i) => (
                              <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                                <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                                <span>{ing}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm text-gray-500">No ingredients were returned for this recipe.</p>
                        )}
                      </div>

                      {/* Steps */}
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <ListOrdered className="w-5 h-5 text-orange-500" /> Instructions
                        </h3>
                        <div className="space-y-4">
                          {steps?.map((step, i) => (
                            <div key={i} className="flex gap-3">
                              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-yellow-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                {i + 1}
                              </div>
                              <p className="text-sm text-gray-600 leading-relaxed pt-0.5">{step}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
            </div>
        </div>
    );
};

export default ResultShow;