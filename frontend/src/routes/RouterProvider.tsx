import { createBrowserRouter } from "react-router";
import BoardAdmin from "../components/board-moderator.component";
import BoardModerator from "../components/board-moderator.component";
import BoardUser from "../components/board-user.component";
import Home from "../components/home.component";
import Login from "../components/login.component";
import Profile from "../components/profile.component";
import Register from "../components/register.component";
import App from "../App";

const router = createBrowserRouter([
    {
        path: "/",
        element: < App />,
    },
    {
        path: "/home",
        element: < Home />,
    },
    {
        path: "/login",
        element: < Login />,
    },
    {
        path: "/register",
        element: < Register />,
    },
    {
        path: "/profile",
        element: < Profile />,
    },
    {
        path: "/user",
        element: < BoardUser />,
    },
    {
        path: "/mod",
        element: < BoardModerator />,
    },
    {
        path: "/admin",
        element: < BoardAdmin />,
    },

]);
export { router };