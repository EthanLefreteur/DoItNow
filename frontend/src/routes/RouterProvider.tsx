import { createBrowserRouter } from "react-router";
import Register from "../components/CreateUser.components";
import Login from "../components/login.component";

import TacheShow from "../components/tache/show.page";
import TacheIndex from "../components/tache/index.component";
import TacheNew from "../components/tache/new.component";
import TacheEdit from "../components/tache/edit.component";
import TacheDelete from "../components/tache/delete.component";

import CategorieIndex from "../components/categorie/index.page"
import CategorieShow from "../components/categorie/show.page"
import AddCategorie from "../components/categorie/addCategorie";

import PrioriteShow from "../components/priorite/show.page"

import StatutShow from "../components/statut/show.page"

import AdminPanel from "../components/panelAdmin.component";
import ShowUser from "../components/utilisateur/show.page";

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
        element: < TacheIndex />,
    },
    {
        path: "/tache/new",
        element: < TacheNew />,
    },
    {
        path: "/tache/edit/:id",
        element: < TacheEdit />,
    },
    {
        path: "/tache/delete/:id",
        element: < TacheDelete />,
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
        element: < ShowUser />,
    },
    {
        path: "/admin/utilisateur/delete/:id",
        element: < TacheIndex />,
    },
    {
        path: "/admin/utilisateur/edit/:id",
        element: < TacheIndex />,
    },
    {
        path: "/categorie/",
        element: < CategorieIndex />,
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
        element: < TacheIndex />,
    },
    {
        path: "/admin/categorie/edit/:id",
        element: < TacheIndex />,
    },
    {
        path: "/admin/priorite/new",
        element: < TacheIndex />,
    },
    {
        path: "/priorite/show/:id",
        element: < PrioriteShow />,
    },
    {
        path: "/admin/priorite/delete/:id",
        element: < TacheIndex />,
    },
    {
        path: "/admin/priorite/edit/:id",
        element: < TacheIndex />,
    },
    {
        path: "/admin/statut/new",
        element: < TacheIndex />,
    },
    {
        path: "/statut/show/:id",
        element: < StatutShow />,
    },
    {
        path: "/admin/statut/delete/:id",
        element: < TacheIndex />,
    },
    {
        path: "/admin/statut/edit/:id",
        element: < TacheIndex />,
    },
]);
export { Router };