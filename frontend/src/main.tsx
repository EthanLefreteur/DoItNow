import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { BrowserRouter, RouterProvider, Route } from "react-router-dom";

import { Router } from "./routes/RouterProvider";

const rootElement = document.getElementById('root') as HTMLElement;

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={Router} />
  </StrictMode>
);
