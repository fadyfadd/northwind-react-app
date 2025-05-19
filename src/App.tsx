import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./RootLayout";
import ProductDashboard from "./product-module/ProductDashboard";
import CustomerDashboard from "./customer-module/CustomerDashboard";
import OrderDashboard from "./order-module/OrderDashbarod";
import { Provider } from "react-redux";
import { store } from "./store/store";

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
  return (
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  );
}

export default App;
