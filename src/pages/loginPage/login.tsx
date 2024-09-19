import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/useAuth";
import { useForm } from "react-hook-form";
import "./login.css"
import { yupResolver } from '@hookform/resolvers/yup';
import { loginValidations } from './loginValidation';

type Props = {};

type AuthFormInputs = {
    email: string;
    password: string;
    name?: string;  // Optional for registration
};

const LoginPage = (props: Props) => {
    const [isLogin, setIsLogin] = useState(true);
    const { loginUser, registerUser, error, clearError } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
        clearErrors,
        watch,
    } = useForm<AuthFormInputs>({
        resolver: yupResolver(loginValidations),
        context: { isLogin },
        mode: 'onBlur', 
    });

    useEffect(() => {
    }, [errors]);

    const handleAuth = (form: AuthFormInputs) => {
        console.log("Form data:", form); 
        if (isLogin) {
            loginUser(form.email, form.password);
        } else {
            registerUser(form.name!, form.email, form.password);
        }
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
        clearError();
    };

    // Using watch for multiple fields
    const [email, password] = watch(["email", "password"]);
    React.useEffect(() => {
        if (email && password) {
            console.log("Email or password changed:", email, password);
            clearError();
        }
    }, [email, password, clearError]);

    return (
        <div className="container">
            <div className="formContainer sm:max-w-md md:max-w-lg">
                <h2 className="title text-xl sm:text-2xl md:text-3xl">{isLogin ? "Welcome Back!" : "Create Account"}</h2>
                <form onSubmit={handleSubmit(handleAuth)} className="form">
                    {!isLogin && (
                        <>
                            <input {...register("name")} className="input" type="name" placeholder="Enter Full Name" />
                            {errors.name && <p className="error">{errors.name.message}</p>}
                        </>
                    )}
                    <div>
                        <input {...register("email")} className="input" type="email" placeholder="Email" />
                        {errors.email && <p className="error">{errors.email.message}</p>}
                    </div>
                    <div>
                        <input 
                          {...register("password")} 
                          className="input" 
                          type="password" 
                          placeholder="Password"
                          onChange={(e) => {
                            register("password").onChange(e);
                            clearErrors("password");
                          }}
                        />
                        {errors.password && <p className="error">{errors.password.message}</p>}
                    </div>
                    {error && <div className="error">{error}</div>}
                    <button type="submit" className="button hover:bg-blue-700">
                        {isLogin ? "Login" : "Sign Up"}
                    </button>
                </form>
                <p className="switchForm hover:underline" onClick={toggleForm}>
                    {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
                </p>
            </div>
        </div>
    );
};

export default LoginPage;