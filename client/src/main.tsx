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
  id: number;
  isOpen: boolean;
}

export const navList: inNavList[] = [
  {
    path: "/",
    id: 1,
    label: "home",
    element: <App />,
    errorElement: <ErrorPage />,
    icon: <MdOutlineHome />,
    isOpen: true,
    children: [
      {
        path: "/",
        label: "home",
        element: <div>home page</div>,
        errorElement: <ErrorPage />,
        icon: <MdOutlineHome />,
        id: 2,
        isOpen: false
      },
      {
        path: "users",
        element: <UsersPage />,
        icon: <HiOutlineUsers />,
        label: "users",
        id: 3,
        children: [
          {
            path: "add",
            element: <AddUserPage />,
            label: "add user",
            icon: <AiOutlineUserAdd />,
            id: 4,
            isOpen: false
          },
          {
            path: "update",
            element: <UpdateUserPage />,
            label: "update user",
            icon: <TbUserEdit />,
            id: 5,
            isOpen: false
          },
        ],
        isOpen: false
      },
      {
        path: "products",
        element: <ProductsPage />,
        label: "products",
        icon: <GiShoppingCart />,
        id: 6,
        children: [
          {
            path: "add",
            element: <div>add products</div>,
            label: "add products",
            icon: <GiShoppingCart />,
            id: 7,
            isOpen: false
          },
        ],
        isOpen: false
      },
      {
        path: "dash",
        label: "dash",
        element: <div>dash</div>,
        icon: <MdOutlineHome />,
        id: 8,
        isOpen: false
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
