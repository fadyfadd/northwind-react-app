import React, { FC, Fragment } from "react";
import { NavLink, Outlet } from "react-router-dom";

const RootLayout: FC = () => {
  return (
    <Fragment>
      <div>Northwind Main Menu</div>
    <br/>
      <div>
        <NavLink to="/product">Products</NavLink> |
        <NavLink to="/customer">Customers</NavLink> |
        <NavLink to="/order">Orders</NavLink> |<br></br>
       <br/>
        <Outlet></Outlet>
      </div>
    </Fragment>
  );
};
export default RootLayout;
