import { tablesDB, DATABASE_ID, RECIPE_COLLECTION_ID , ENDPOINT,PROJECT_ID , LIKES_COLLECTION_ID , uId , account , Query , storage , RECIPE_BUCKET_ID } from "../lib/appWrite.js";

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
        queries: [Query.equal('userId', user.$id),Query.select(['recipeId.prompt','recipeId.calories','recipeId.time_require','recipeId.category','recipeId.userId.username','recipeId.image_url'])]
    });
    return response;
}

const updateRecipeImage = async (recipeId, file) => {
    try {
        let fileExists = true;
        try {
            await storage.getFile({
                bucketId: RECIPE_BUCKET_ID,
                fileId: recipeId
            });
        } catch (err) {
            if (err.code === 404) {
                fileExists = false;
            } else {
                throw err;
            }
        }

        if (fileExists) {
            await storage.deleteFile({
                bucketId: RECIPE_BUCKET_ID,
                fileId: recipeId
            });
        }

        const response = await storage.createFile({
            bucketId: RECIPE_BUCKET_ID,
            fileId: recipeId,
            file: file
        });

        const recipe = await tablesDB.updateRow({
            databaseId: DATABASE_ID,
            tableId: RECIPE_COLLECTION_ID,
            rowId: recipeId,
            data: {
                image_url: `${ENDPOINT}/storage/buckets/${RECIPE_BUCKET_ID}/files/${response.$id}/view?project=${PROJECT_ID}&v=${Date.now()}`
            }
        });
        return recipe;
    } catch (error) {
        console.error("updateRecipeImage failed:", error);
        return null;
    }
};


export { uploadRecipe, likeUpdate , totalLikes , isLiked , userLikeds , updateRecipeImage };