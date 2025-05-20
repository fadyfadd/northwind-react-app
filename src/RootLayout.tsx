import React, { FC, Fragment} from "react";
import { useSelector } from "react-redux";
import { Navigate, NavLink, Outlet} from "react-router-dom";
import { RootState } from "./store/store";

const RootLayout: FC = () => {
  var authentication = useSelector(
    (selector: RootState) => selector.authentication
  );

  return authentication.isAuthenticated ? (
    <Fragment>
      <div><b>Northwind Application</b></div>
      <br />
      <div>
        <NavLink to="/home" end>Home</NavLink> |
        <NavLink to="/login" end>Login</NavLink> |
        <NavLink to="/product" end>Products</NavLink> |
        <NavLink to="/customer" end>Customers</NavLink> |
        <NavLink to="/order" end>Orders</NavLink> |<br></br>
        <br />
        <Outlet></Outlet>
      </div>
    </Fragment>
  ) : (
    <Fragment>
      <Outlet></Outlet>
      <Navigate to="/login"></Navigate>
    </Fragment>
  );
};
export default RootLayout;
