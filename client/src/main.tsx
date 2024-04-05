import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { IconType } from "react-icons";
import { MdOutlineHome } from "react-icons/md";
import { GiShoppingCart } from "react-icons/gi";
import { RiAddBoxLine } from "react-icons/ri";
import { HiOutlineUsers } from "react-icons/hi2";
import { ErrorPage, ProductsPage, UsersPage } from "./pages/index.ts";
import AddProductPage from "./pages/products/AddProductPage.tsx";

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
        path: "users",
        element: <UsersPage />,
        icon: <HiOutlineUsers />,
        label: "users",
        id: 3,
        isOpen: false,
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
            element: <AddProductPage />,
            label: "add products",
            icon: <RiAddBoxLine />,
            id: 7,
            isOpen: false,
          },
        ],
        isOpen: false,
      },
      {
        path: "dash",
        label: "dash",
        element: <div>dash</div>,
        icon: <MdOutlineHome />,
        id: 8,
        isOpen: false,
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
