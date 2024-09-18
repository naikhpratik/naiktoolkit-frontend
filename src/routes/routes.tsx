import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginPage from "../pages/loginPage/login";
import ProtectedRoute from "./protectedRoute";
import HomePage from "../pages/homePage/home";

export const router = createBrowserRouter([
    {
        path: "/",
        element: 
            <App />,
        children: [
            // { path: "", element: <HomePage /> },
            { path: "login", element: <LoginPage /> },
            { path: "home", element: <ProtectedRoute><HomePage /></ProtectedRoute>},
        ]
    },
]);