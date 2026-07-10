import React from "react";
import {
    Soup,
    Flame,
    Clock,
    ExternalLink,
    Trash2
} from "lucide-react";
import { Link } from "react-router-dom"

const UserRecipes = React.memo(({ recipe , delSpecificRecipe }) => {
    return (
        <div className="group flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-100 transition-colors cursor-pointer border border-transparent hover:border-gray-100">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-orange-400 flex-shrink-0`}>
                {recipe.image_url ? <img src={recipe.image_url} alt={recipe.prompt} className="w-full h-full object-cover rounded-2xl" /> : <Soup className="w-6 h-6 text-white" />}
            </div>
            <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 truncate">{recipe.prompt}</h4>
                <div className="flex items-center gap-3 mt-1 text-sm text-gray-500 flex-wrap">
                    <span className="flex items-center gap-1"><Flame className="w-3.5 h-3.5" /> {recipe.calories}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {recipe.time_require}</span>
                    <Link to={`/recipe/${recipe.$id}`}><ExternalLink className="w-6 h-6 p-1 hover:bg-gray-200 rounded-full cursor-pointer" /></Link>
                    <span onClick={() => delSpecificRecipe(recipe.$id)}><Trash2 className="w-6 h-6 p-1 hover:bg-gray-200 rounded-full cursor-pointer" /></span>
                </div>
            </div>
        </div>
    );
});

export default UserRecipes;