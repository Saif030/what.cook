import { Account } from 'node-appwrite';
import { createClient } from '../lib/appWriteConfig.js';

const Authenticate = async (req, res , next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        return res.status(400).json({ success: false, error: "Authorization header is required" });
    }
    
    const jwt = authHeader?.startsWith('Bearer ') 
        ? authHeader.slice(7) 
        : null;
    
    try {
        const client = createClient(jwt);
        const account = new Account(client);
        const user = await account.get();

        if (!user) {
            return res.status(401).json({ success: false, error: "User not found" });
        }
        
        req.user = user;      
        next();

    } catch (error) {
        console.error("Appwrite error:", error);
        res.status(error.code || 401).json({ 
            success: false,
            error: error.message,
            type: error.type 
        });
    }
};

export { Authenticate };