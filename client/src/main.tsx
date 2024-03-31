import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { IconType } from "react-icons";
import { MdOutlineHome } from "react-icons/md";
import { GiShoppingCart } from "react-icons/gi";
import { AiOutlineUserAdd } from "react-icons/ai";
import { TbUserEdit } from "react-icons/tb";
import { HiOutlineUsers } from "react-icons/hi2";

import {
  AddUserPage,
  ErrorPage,
  ProductsPage,
  UpdateUserPage,
  UsersPage,
} from "./pages/index.ts";

export interface inNavList {
  path: string;
  label: string;
  element: React.ReactNode;
  errorElement?: React.ReactNode;
  icon: React.ReactNode;
  children?: inNavList[];
}

export const navList: inNavList[] = [
  {
    path: "/",
    label: "home",
    element: <App />,
    errorElement: <ErrorPage />,
    icon: <MdOutlineHome />,
    children: [
      {
        path: "/users",
        element: <UsersPage />,
        icon: <HiOutlineUsers />,
        label: "users",
        children: [
          {
            path: "add",
            element: <AddUserPage />,
            label: "add user",
            icon: <AiOutlineUserAdd />,
          },
          {
            path: "update",
            element: <UpdateUserPage />,
            label: "update user",
            icon: <TbUserEdit />,
          },
        ],
      },
      {
        path: "/products",
        element: <ProductsPage />,
        label: "products",
        icon: <GiShoppingCart />,
      },
    ],
  },
];

const router = createBrowserRouter(navList);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
