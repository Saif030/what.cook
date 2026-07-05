import { createContext, useState, useEffect, useCallback } from "react";
import { register, login, getUser, logout } from "../utils/auth.js";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    console.log(user)

    const runAuthAction = useCallback(async (action) => {
        try {
            setIsLoading(true);
            setError(null);
            const result = await action();
            setUser(result || null);
            setIsAuthenticated(!!result);
            return result;
        } catch (err) {
            console.error(err);
            setError(err.message || "Something went wrong");
            setUser(null);
            setIsAuthenticated(false);
            return false;
        } finally {
            setIsLoading(false);
        }
    }, []);


    const handleRegister = (username, email, password, isAgree) =>
        runAuthAction(() => register(username, email, password, isAgree));

    const handleLogin = (email, password) =>
        runAuthAction(() => login(email, password));

    const handleGetUser = () => runAuthAction(() => getUser());

    const handleLogout = () => runAuthAction(() => logout());

    // Check if user is already logged in on app mount
    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                await handleGetUser();
            } catch (err) {
                console.error("Auth check failed:", err);
            } finally {
                setIsInitialized(true);
            }
        };
        
        if (!isInitialized) {
            checkAuthStatus();
        }
    }, [isInitialized, handleGetUser]);

    const value = { user, isLoading, error, handleRegister, handleLogin, handleGetUser, isAuthenticated, handleLogout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;