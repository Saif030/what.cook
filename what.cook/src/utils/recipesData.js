import { tablesDB, DATABASE_ID, RECIPE_COLLECTION_ID , account , Query } from "../lib/appWrite.js";

const getDashboardUserData = async () => {
    try {
        const user = await account.get();
        const response = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: RECIPE_COLLECTION_ID,
            queries: [
                Query.equal('userId', user.$id)
            ]
        });
        return response;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const getAllRecipes = async () => {
    try {
        const response = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: RECIPE_COLLECTION_ID,
            queries: [
                Query.select(['prompt','calories','time_require','category','userId.username','image_url'])
            ]
        });
        return response;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const getSpecificRecipeData = async (recipeId) => {
    try {
        const response = await tablesDB.getRow({
            databaseId: DATABASE_ID,
            tableId: RECIPE_COLLECTION_ID,
            rowId: recipeId
        });
        return response;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const deleteRecipe = async (recipeId) => {
    try {
        const response = await tablesDB.deleteRow({
            databaseId: DATABASE_ID,
            tableId: RECIPE_COLLECTION_ID,
            rowId: recipeId
        });
        return response;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export { getDashboardUserData, getAllRecipes, getSpecificRecipeData, deleteRecipe };