import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { BrowserRouter, RouterProvider, Route } from "react-router-dom";

import { Router } from "./routes/RouterProvider";

import Login2 from "./components/login2.component";
import Taskpage from "./components/task.component";

const rootElement = document.getElementById('root') as HTMLElement;

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={Router} />
  </StrictMode>
);
