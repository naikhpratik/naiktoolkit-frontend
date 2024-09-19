import { createContext, useEffect, useState } from "react";
import { UserProfile } from "../models/userProfileToken";
import { useNavigate } from "react-router";
import axios from "axios";
import { loginAPI, registerAPI } from "../services/authService";
import { toast } from "react-toastify";
import React from "react";
import { getErrorMessage } from "../helpers/errorHandler";

type UserContextType = {
    user: UserProfile | null;
    token: string | null;
    registerUser: (name: string, email: string, password: string) => void;
    loginUser: (email: string, password: string) => void;
    logout: () => void;
    isLoggedIn: () => boolean;
    error: string | null;
    clearError: () => void; // Changed from string | null to () => void
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {

    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isReady, setIsReady] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const clearError = () => setError(null);

    useEffect(() => {
        //Can make more secure way to store token
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if (user && token) {
            setUser(JSON.parse(user));
            setToken(token);
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        }
        setIsReady(true);
    }, []);

    const registerUser = async (
        name: string,
        email: string,
        password: string
    ) => {
        setError(null);
        try {
            const res = await registerAPI(name, email, password);
            if (res) {
                localStorage.setItem("token", res.data.token);
                const userObj: UserProfile = {
                    name: res.data.name,
                    email: res.data.email,
                };
                localStorage.setItem("user", JSON.stringify(userObj));
                setToken(res.data.token);
                setUser(userObj);
                toast.success("Registered Successfully!");
                navigate("/home");
            }
        } catch (err: any) {
            console.log(err.response.data);
            if (err.response?.data?.errorCode) {
                setError(getErrorMessage(err.response.data.errorCode));
            } else {
                setError('Something went wrong. Please try again.');
            }
            toast.error(error || 'Registration failed');
        }
    };

    const loginUser = async (email: string, password: string) => {
        setError(null);
        try {
            const res = await loginAPI(email, password);
            if (res) {
                localStorage.setItem("token", res?.data.token);
                const userObj: UserProfile = {
                    name: res?.data.name,
                    email: res?.data.email,
                };
                localStorage.setItem("user", JSON.stringify(userObj));
                setToken(res?.data.token!);
                setUser(userObj!);
                toast.success("Login Success!");
                navigate("/home");
            }
        } catch (err: any) {
            if (err.response?.data?.errorCode) {
                setError(getErrorMessage(err.response.data.errorCode));
            } else {
                setError('Something went wrong. Please try again.');
            }
            toast.error(error || 'Login failed');
        }
    };

    const isLoggedIn = () => {
        return !!user;
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setToken("");
        navigate("/login");
    };

    return (
        <UserContext.Provider value={{ 
            loginUser, 
            registerUser, 
            error, 
            clearError, 
            logout, 
            isLoggedIn, 
            token, 
            user 
        }}>
            {isReady ? children : null}
        </UserContext.Provider>
    );
};

export const useAuth = () => React.useContext(UserContext);