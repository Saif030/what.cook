import { Client } from 'node-appwrite';

export const createClient = (jwt = null) => {
    const client = new Client()
        .setEndpoint(process.env.APPWRITE_ENDPOINT)
        .setProject(process.env.APPWRITE_PROJECT_ID);
    
    if (jwt) {
        client.setJWT(jwt);
    }
    
    return client;
};