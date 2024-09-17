import React, { useState } from "react";
import * as authValidation from '../../utils/authValidation';
import { useAuth } from "../../context/useAuth";
import { useForm } from "react-hook-form";
import "./login.css"

type Props = {};

// type LoginFormsInputs = {
//     email: string;
//     password: string;
// };

// type RegisterFormsInputs = {
//     name: string;
//     email: string;
//     password: string;
// };

// type AuthFormInputs = LoginFormsInputs & RegisterFormsInputs;
// // type AuthFormInputs = LoginFormsInputs & {
// //     name: string;
// // };

type AuthFormInputs = {
    email: string;
    password: string;
    name?: string;  // Optional for registration
};

const validateForm = (values: AuthFormInputs, isLogin: boolean) => {
    const errors: Partial<AuthFormInputs> = {};

    if (!authValidation.isValidEmail(values.email)) {
        errors.email = 'Please enter a valid email address.';
        return;
    }

    if (!authValidation.isValidPassword(values.password)) {
        errors.password = 'Password does not meet the requirements.';
        return;
    }
    return errors;
};

const LoginPage = (props: Props) => {
    const [isLogin, setIsLogin] = useState(true);
    const { loginUser, registerUser } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AuthFormInputs>({
        // resolver: (values) => {
        //     const errors = validateForm(values, isLogin);
        //     return {
        //         values: errors ? {} : values,
        //         errors: Object.fromEntries(
        //             Object.entries(errors || {}).map(([key, value]) => [key, { message: value }])
        //         )
        //     };
        // }
        


        //Look into the above code for validation
        mode: "onBlur",
    });

    const handleAuth = (form: AuthFormInputs) => {
        console.log("Form data:", form); 
        if (isLogin) {
            loginUser(form.email, form.password);
        } else {
            registerUser(form.name!, form.email, form.password);
        }
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
                    <input {...register("password")} className="input" type="password" placeholder="Password" />
                    {errors.password && <p className="error">{errors.password.message}</p>}
                    <button type="submit" className="button">
                        {isLogin ? "Login" : "Sign Up"}
                    </button>
                </form>
                <p className="switchForm" onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
                </p>
            </div>
        </div>
    );
};

export default LoginPage;