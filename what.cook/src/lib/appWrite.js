import { Client, Account , TablesDB , ID , Query , Storage , Role , Permission } from "appwrite";

const ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;

const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID);


const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
const USERS_COLLECTION_ID = import.meta.env.VITE_USERS_COLLECTION_ID;
const RECIPE_COLLECTION_ID = import.meta.env.VITE_RECIPE_COLLECTION_ID;
const FEEDBACK_COLLECTION_ID = import.meta.env.VITE_FEEDBACK_COLLECTION_ID;
const LIKES_COLLECTION_ID = import.meta.env.VITE_LIKES_COLLECTION_ID;
const RECIPE_BUCKET_ID = import.meta.env.VITE_RECIPES_BUCKET_ID;
const uId = ID.unique();

const account = new Account(client);
const tablesDB = new TablesDB(client);
const storage = new Storage(client);

export { client, account, DATABASE_ID, USERS_COLLECTION_ID, tablesDB, uId, RECIPE_COLLECTION_ID, FEEDBACK_COLLECTION_ID, LIKES_COLLECTION_ID , RECIPE_BUCKET_ID, PROJECT_ID, storage ,ENDPOINT, Role , Permission, Query };
