import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import MainPage from "./pages/MainPage.tsx";
import Edit from "./pages/Edit.tsx";
import CreateTemplate from "./pages/Create.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

/*asd*/

const router = createBrowserRouter([
  {
    path: "/Login",
    element: <App />,
  },
  {
    path: "/Anasayfa",
    element: <MainPage />,
  },
  {
    path: "/Edit",
    element: <Edit />,
  },
  {
    path: "/Edit/:id",
    element: <Edit />,
  },
  {
    path: "/CreateTemplate",
    element: <CreateTemplate />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
