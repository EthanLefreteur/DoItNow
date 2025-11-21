import { createBrowserRouter } from "react-router";
import Register from "../components/CreateUser.components";
import Login from "../components/login2.component";
import Task from "../components/task.component";
import AddTaskPage from "../components/addTask.component";
import EditTaskPage from "../components/editTask.component";
import DeleteTask from "../components/deleteTask.component";

const Router = createBrowserRouter([
    {
        path: "/",
        element: < Login />,
    },
    {
        path: "/login",
        element: < Login />,
    },
    {
        path: "/task",
        element: < Task />,
    },
    {
        path: "/add-task",
        element: < AddTaskPage />,
    },
    {
        path: "/edit-task/{id}",
        element: < EditTaskPage />,
    },
    {
        path: "/delete-task/{id}",
        element: < DeleteTask />,
    },
    {
        path: "/CreateUser",
        element: < Register />,
    }
]);
export { Router };