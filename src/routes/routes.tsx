import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginPage from "../pages/loginPage/login";
import Home from "../components/Home";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            // { path: "", element: <HomePage /> },
            { path: "login", element: <LoginPage /> },
            { path: "home", element: <Home /> },
        ]
    },
]);