import { createBrowserRouter } from "react-router";
import Register from "../components/CreateUser.components";
import Login from "../components/login.component";
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
        path: "/tache",
        element: < Task />,
    },
    {
        path: "/tache/new",
        element: < AddTaskPage />,
    },
    {
        path: "/tache/edit/{id}",
        element: < EditTaskPage />,
    },
    {
        path: "/tache/delete/{id}",
        element: < DeleteTask />,
    },
    {
        path: "/admin/utilisateur/new",
        element: < Register />,
    },
    {
        path: "/admin/utilisateur/show/{id}",
        element: < Task />,
    },
    {
        path: "/admin/utilisateur/delete/{id}",
        element: < Task />,
    },
    {
        path: "/admin/utilisateur/edit/{id}",
        element: < Task />,
    },
    {
        path: "/admin/categorie/new",
        element: < Task />,
    },
    {
        path: "/categorie/show/{id}",
        element: < Task />,
    },
    {
        path: "/admin/categorie/delete/{id}",
        element: < Task />,
    },
    {
        path: "/admin/categorie/edit/{id}",
        element: < Task />,
    },
    {
        path: "/admin/priorite/new",
        element: < Task />,
    },
    {
        path: "/priorite/show/{id}",
        element: < Task />,
    },
    {
        path: "/admin/priorite/delete/{id}",
        element: < Task />,
    },
    {
        path: "/admin/priorite/edit/{id}",
        element: < Task />,
    },
    {
        path: "/admin/statut/new",
        element: < Task />,
    },
    {
        path: "/statut/show/{id}",
        element: < Task />,
    },
    {
        path: "/admin/statut/delete/{id}",
        element: < Task />,
    },
    {
        path: "/admin/statut/edit/{id}",
        element: < Task />,
    },
]);
export { Router };