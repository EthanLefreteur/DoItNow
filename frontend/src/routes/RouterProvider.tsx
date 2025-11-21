import { createBrowserRouter } from "react-router";
import Register from "../components/CreateUser.components";
import Login from "../components/login.component";
import Task from "../components/task.component";
import AddTaskPage from "../components/tache/AddTask.component";
import EditTaskPage from "../components/tache/EditTask.component";
import DeleteTask from "../components/tache/deleteTask.component";

import CategorieShow from "../components/categorie/show.page"
import AddCategorie from "../components/categorie/addCategorie";

import PrioriteShow from "../components/priorite/show.page"

import StatutShow from "../components/statut/show.page"

import UserShow from "../components/utilisateur/show.page"
import AdminPanel from "../components/panelAdmin.component";

import TacheShow from "../components/tache/show.page"

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
        path: "/tache/edit/:id",
        element: < EditTaskPage />,
    },
    {
        path: "/tache/delete/:id",
        element: < DeleteTask />,
    },
    {
        path: "/tache/show/:id",
        element: < TacheShow />,
    },
    {
        path: "/admin/utilisateur/new",
        element: < Register />,
    },
    {
        path: "/admin/panel",
        element: < AdminPanel />,
    },
    {
        path: "/admin/utilisateur/show/:id",
        element: < UserShow />,
    },
    {
        path: "/admin/utilisateur/delete/:id",
        element: < Task />,
    },
    {
        path: "/admin/utilisateur/edit/:id",
        element: < Task />,
    },
    {
        path: "/admin/categorie/new",
        element: < AddCategorie />,
    },
    {
        path: "/categorie/show/:id",
        element: < CategorieShow />,
    },
    {
        path: "/admin/categorie/delete/:id",
        element: < Task />,
    },
    {
        path: "/admin/categorie/edit/:id",
        element: < Task />,
    },
    {
        path: "/admin/priorite/new",
        element: < Task />,
    },
    {
        path: "/priorite/show/:id",
        element: < PrioriteShow />,
    },
    {
        path: "/admin/priorite/delete/:id",
        element: < Task />,
    },
    {
        path: "/admin/priorite/edit/:id",
        element: < Task />,
    },
    {
        path: "/admin/statut/new",
        element: < Task />,
    },
    {
        path: "/statut/show/:id",
        element: < StatutShow />,
    },
    {
        path: "/admin/statut/delete/:id",
        element: < Task />,
    },
    {
        path: "/admin/statut/edit/:id",
        element: < Task />,
    },
]);
export { Router };