import { createBrowserRouter } from "react-router";
import Login from "../pages/Login";
import Logout from "../pages/Logout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <div>Hello World</ div >,
    },
    {
        path: "/pages/login",
        element: < Login />,
    },
    {
        path: "/pages/logout",
        element: < Logout />,
    }
]);
export { router };

