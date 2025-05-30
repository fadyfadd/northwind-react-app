import React, { Fragment } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./shared-components/RootLayout";
import ProductDashboard from "./product-module/product-dashboard";
import CustomerDashboard from "./customer-module/customer-dashboard";
import OrderDashboard from "./order-module/order-dashboard";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { HomePage } from "./home";
import ProductList from "./product-module/product-list";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "home", element: <HomePage /> },
      {
        path: "product",
        element: <ProductDashboard />,
        children: [{ path: "all", element:<ProductList ></ProductList> }],
      },
      { path: "customer", element: <CustomerDashboard /> },
      { path: "order", element: <OrderDashboard /> },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  );
}

export default App;
