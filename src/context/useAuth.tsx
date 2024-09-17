import { createContext, useEffect, useState } from "react";
import { UserProfile } from "../models/userProfileToken";
import { useNavigate } from "react-router";
import axios from "axios";
import { loginAPI, registerAPI } from "../services/authService";
import { toast } from "react-toastify";
import React from "react";

type UserContextType = {
    user: UserProfile | null;
    token: string | null;
    registerUser: (name: string, email: string, password: string) => void;
    loginUser: (email: string, password: string) => void;
    logout: () => void;
    isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {

    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isReady, setIsReady] = useState(false);

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
        console.log("Name : ", name);
        console.log("Email : ", email);
        console.log("Password : ", password);
        await registerAPI(name, email, password)
            .then((res) => {
                if (res) {
                    localStorage.setItem("token", res?.data.token);
                    const userObj: UserProfile = {
                        name: res?.data.name,
                        email: res?.data.email,
                    };
                    localStorage.setItem("user", JSON.stringify(userObj));
                    setToken(res?.data.token!);
                    setUser(userObj!);
                    toast.success("Registered Successfully!");
                    navigate("/home");
                }
            })
            .catch((e) => toast.warning("Server error occured"));
    };

    const loginUser = async (
        email: string,
        password: string
    ) => {
        
        console.log("Email : ", email);
        console.log("Password : ", password);
        await loginAPI(email, password)
            .then((res) => {
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
            })
            .catch((e) => toast.warning("Server error occured"));
    };

    const isLoggedIn = () => {
        return !!user;
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setToken("");
        navigate("/");
    };

    return (
        <UserContext.Provider value={{ loginUser, user, token, logout, isLoggedIn, registerUser }}  >
            {isReady ? children : null}
        </UserContext.Provider>
    );
};

export const useAuth = () => React.useContext(UserContext);