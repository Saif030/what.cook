import { useContext, useEffect } from 'react';
import { DataContext } from '../context/DataContext';
import { useParams } from 'react-router-dom';
import RsultShow from '../components/ResultShow.jsx';

const RecipesShow = () => {
    const { id } = useParams();
    const { getSpecificRecipe , specificRecipe } = useContext(DataContext);
    
    useEffect(() => {
        getSpecificRecipe(id);
    },[id])

    return (
        <div className="flex-1 max-w-4xl mx-auto w-full px-6 py-8 mt-16">
            <RsultShow value={specificRecipe} />
        </div>
    );
};

export default RecipesShow;