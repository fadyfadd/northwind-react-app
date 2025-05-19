import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./RootLayout";
import ProductDashboard from "./product-module/ProductDashboard";
import CustomerDashboard from "./customer-module/CustomerDashboard";
import OrderDashboard from "./order-module/OrderDashbarod";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "product", element: <ProductDashboard /> },
      { path: "customer", element: <CustomerDashboard /> },
      { path: "order", element: <OrderDashboard /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
