import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import "./index.css";
import Home, { loader as homeLoader } from "./pages/Home";
import Categories, { loader as categoriesLoader } from "./pages/Categories";
import Recipe from "./pages/Recipe";
import About from "./pages/About";
import AppLayout from "./components/AppLayout";
import Favorites from "./pages/Favorites";
import SearchReasult from "./pages/SearchReasult";
import Error from "./components/Error";
import SearchRegion from "./pages/searchRegion";
import Ingredients from "./pages/Ingredients";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: homeLoader,
      },
      {
        path: "/categories",
        element: <Categories />,
        loader: categoriesLoader,
        errorElement: <Error />,
      },
      {
        path: "/recipe",
        element: <Recipe />,
      },
      {
        path: "/recipe/:id",
        element: <Recipe />,
      },
      {
        path: "/search",
        element: <SearchReasult />,
      },
      {
        path: "/favorites",
        element: <Favorites />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/regions/:region",
        element: <SearchRegion />,
      },
      {
        path: "/ingredients/:ingredient",
        element: <Ingredients />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
