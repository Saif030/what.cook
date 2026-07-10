import { createContext, useState , useCallback } from "react";
import axios from "axios";
import { getJwt , submitFeedback } from "../utils/auth.js";
import { uploadRecipe , saveUpdate , userSaved , updateRecipeImage , isSaved } from "../utils/dbUpload.js";
import { getDashboardUserData , getAllRecipes, getSpecificRecipeData, deleteRecipe } from "../utils/recipesData.js";

export const DataContext = createContext();

const DataContextProvider = ({ children }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [userRecipes, setUserRecipes] = useState(null);
    const [allRecipes, setAllRecipes] = useState(null);
    const [specificRecipe, setSpecificRecipe] = useState(null);
    const [userSavedRecipes, setUserSavedRecipes] = useState(null);
    const [prompt, setPrompt] = useState("");
    const [recipeSaved, setRecipeSaved] = useState(false)

    const aiCook = async (prompt) => {
        try {
            setLoading(true);
            const { jwt } = await getJwt();

            const response = await axios.post("https://cook-backend-nu.vercel.app/user", {prompt} ,{headers: {"Content-Type": "application/json","Authorization": `Bearer ${jwt}`}});
            await uploadRecipe(response?.data?.response);
            setData(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getUserRecipes = async () => {
        try {
            setLoading(true);
            const response = await getDashboardUserData();
            const savedResponse = await userSaved();
            setUserSavedRecipes(savedResponse);
            setUserRecipes(response || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchAllRecipes = async () => {
        try {
            setLoading(true);
            const response = await getAllRecipes();
            setAllRecipes(response);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getSpecificRecipe = async (recipeId) => {
        try {
            setLoading(true);
            const response = await getSpecificRecipeData(recipeId);
            setSpecificRecipe(response);
            return response;
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    
    const delSpecificRecipe = useCallback(async (recipeId) => {
        try {
            setLoading(true);
            const response = await deleteRecipe(recipeId);
            await getUserRecipes();
            return response;
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [getUserRecipes]);

    const Feedback = async (formData) => {
        try {
            setLoading(true);
            const response = await submitFeedback(formData);
            return response;
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const postSaved = async (recipeId) => {
        try {
            await saveUpdate(recipeId);
        } catch (error) {
            console.error(error);
        } 
    };

    // const getUserSavedRecipes = async () => {
    //     try {
    //         const response = await userSaved();
    //         setUserSavedRecipes(response);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    const handleGenerate = async (e) => {
        e.preventDefault();
        if (!prompt.trim()) return;
        await aiCook(prompt);
        setPrompt("");
    }
    
    const handleImageUpload = async (recipeId, file) => {
        try {
            setLoading(true);
            await updateRecipeImage(recipeId, file);
            await getSpecificRecipe(recipeId);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    
    const isRecipeSaved = async (recipeId) => {
        try {
            const response = await isSaved(recipeId);
            setRecipeSaved(response?.saved);
            return response;
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <DataContext.Provider value={{aiCook, data, loading, userRecipes , postSaved , fetchAllRecipes , allRecipes , getUserRecipes , getSpecificRecipe , specificRecipe, delSpecificRecipe, Feedback, userSavedRecipes , prompt, setPrompt, handleGenerate, handleImageUpload, isRecipeSaved, recipeSaved}}>
            {children}
        </DataContext.Provider>
    );
};

export default DataContextProvider;