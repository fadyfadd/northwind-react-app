import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./RootLayout";
import ProductDashboard from "./product-module/product-dashboard";
import CustomerDashboard from "./customer-module/customer-dashboard";
import OrderDashboard from "./order-module/order-dashboard";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Login from "./login";
import { HomePage } from "./home";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "home", element: <HomePage /> },
      { path: "product", element: <ProductDashboard /> },
      { path: "customer", element: <CustomerDashboard /> },
      { path: "order", element: <OrderDashboard /> },
      { path: "login", element: <Login /> },
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
