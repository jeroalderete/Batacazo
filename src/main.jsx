// React Imports

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Components Imports

import Root from "./routes/Root";
import Layout from "./components/Layout/Layout";
import ErrorPage from "./routes/ErrorPage";
import ItemRoot from "./routes/ItemRoot";
import { CartProvider } from "./Context/CartContext";
import Cart from "./components/Cart/Cart";

import Checkout from "./components/Checkout/Checkout";

// CSS Imports

import "./index.css";

//FireBase Import

import { initializeApp } from "firebase/app";

let firebaseKey = `${import.meta.env}`;

const firebaseConfig = {
  
  apiKey: firebaseKey,

  authDomain: "ecommerce-batacazo.firebaseapp.com",

  projectId: "ecommerce-batacazo",

  storageBucket: "ecommerce-batacazo.appspot.com",

  messagingSenderId: "852330671690",

  appId: firebaseKey,
};

initializeApp(firebaseConfig);

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Root />,
      },
      {
        path: "/category/:id",
        element: <Root />,
      },
      {
        path: "/item/:id",
        element: <ItemRoot />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </React.StrictMode>
);
