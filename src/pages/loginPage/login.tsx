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
    } = useForm<AuthFormInputs>({
        resolver: yupResolver(loginValidations),
        context: { isLogin },
        mode: 'onBlur', // Add this line
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

    return (
        <div className="container">
            <div className="formContainer">
                <h2 className="title">{isLogin ? "Welcome Back!" : "Create Account"}</h2>
                <form onSubmit={handleSubmit(handleAuth)} className="form">
                    {!isLogin && (
                        <>
                            <input {...register("name")} className="input" type="name" placeholder="Enter Full Name" />
                            {errors.name && <p className="error">{errors.name.message}</p>}
                        </>
                    )}
                    <input {...register("email")} className="input" type="email" placeholder="Email" />
                    {errors.email && <p className="error">{errors.email.message}</p>}
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
                    {/* Display error message */}
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    <button type="submit" className="button">
                        {isLogin ? "Login" : "Sign Up"}
                    </button>
                </form>
                <p className="switchForm" onClick={toggleForm}>
                    {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
                </p>
            </div>
        </div>
    );
};

export default LoginPage;