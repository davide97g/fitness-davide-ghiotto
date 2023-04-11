import React from "react";
import { createBrowserRouter } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Weight from "./pages/Weight";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/weight",
    element: <Weight />,
  },
]);
