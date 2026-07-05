import { account , tablesDB , DATABASE_ID , USERS_COLLECTION_ID , uId , FEEDBACK_COLLECTION_ID } from "../lib/appWrite.js";

const register = async (username, email, password ,isAgree) => {
    try {
        const response = await account.create(
            {
                userId: uId,
                email: email,
                password: password,
                name: username 
            }
        );
        const result = await tablesDB.createRow({
            databaseId: DATABASE_ID,
            tableId: USERS_COLLECTION_ID,
            rowId: response.$id,
            data: {
                username,
                email,
                isAgree
            }
        })
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const login = async (email, password) => {
    try {
        const response = await account.createEmailPasswordSession({email, password});
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const logout = async () => {
    try {
        const response = await account.deleteSession('current');
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getUser = async () => {
    try {
        const response = await account.get();
        const result = await tablesDB.getRow({
            databaseId: DATABASE_ID,
            tableId: USERS_COLLECTION_ID,
            rowId: response.$id
        });
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getJwt = async () => {
    try{
        const response = await account.createJWT();
        return response;
    }catch(error){
        console.error(error);
        throw error;
    }
};

const submitFeedback = async (formData) => {
    try {
        const user = await account.get();
        const response = await tablesDB.createRow({
            databaseId: DATABASE_ID,
            tableId: FEEDBACK_COLLECTION_ID,
            rowId: uId,
            data: {
                userId: user.$id,
                ...formData
            }
        });
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export { register , login , getUser , logout , getJwt , submitFeedback };
