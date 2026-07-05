import { tablesDB, DATABASE_ID, RECIPE_COLLECTION_ID , LIKES_COLLECTION_ID , uId , account , Query } from "../lib/appWrite.js";

const uploadRecipe = async (recipe) => {
    try {
        const user = await account.get();
        const response = await tablesDB.createRow({
            databaseId: DATABASE_ID,
            tableId: RECIPE_COLLECTION_ID,
            rowId: uId,
            data: {
                userId: user.$id,
                ...recipe
            }
        });
        return response;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const likeUpdate = async (recipeId) => {
    try {
        const user = await account.get();
        const isLikedResponse = await isLiked(recipeId);
        if (isLikedResponse && isLikedResponse.total > 0){
            await tablesDB.deleteRow({
                databaseId: DATABASE_ID,
                tableId: LIKES_COLLECTION_ID,
                rowId: isLikedResponse?.rows[0]?.$id
            });
            return null;
        }
        const response = await tablesDB.createRow({
            databaseId: DATABASE_ID,
            tableId: LIKES_COLLECTION_ID,
            rowId: uId,
            data: {
                userId: user.$id,
                recipeId: recipeId
            }
        });
        return response;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const totalLikes = async (recipeId) => {
    try {
        const response = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: LIKES_COLLECTION_ID,
            queries: [Query.equal('recipeId', recipeId)]
        });
        return response;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const isLiked = async (recipeId) => {
    try {
        const user = await account.get();
        const response = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: LIKES_COLLECTION_ID,
            queries: [Query.equal('recipeId', recipeId), Query.equal('userId', user.$id)]
        });
        return response;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const userLikeds = async () => {
    const user = await account.get();
    const response = await tablesDB.listRows({
        databaseId: DATABASE_ID,
        tableId: LIKES_COLLECTION_ID,
        queries: [Query.equal('userId', user.$id)]
    });
    return response;
}

export { uploadRecipe, likeUpdate , totalLikes , isLiked , userLikeds };