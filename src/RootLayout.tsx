import React, { FC, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, NavLink, Outlet } from "react-router-dom";
import { RootState } from "./store/store";
import FormDialog from "./login-form";
import { logout } from "./store/authentication-slice";
import { Button } from "@mui/material";

const RootLayout: FC = () => {
  var authentication = useSelector(
    (selector: RootState) => selector.authentication
  );

  var dispatcher = useDispatch();

  function logoutAction() {
    dispatcher(logout());
  }
 
  if (authentication.token)
    return (
      <Fragment>
        <div>
          <b>Northwind Application</b>
        </div>
        <br />
        <div>
          <NavLink to="/#" end onClick={logoutAction}>
            <Button>Logout</Button>
          </NavLink>
          |
          <NavLink to="/home" end>
            <Button>Home</Button>
          </NavLink>
          |
          <NavLink to="/product" end>
            <Button>Product</Button>
          </NavLink>
          |
          <NavLink to="/customer" end>
            <Button>Customer</Button>
          </NavLink>
          |
          <NavLink to="/order" end>
            <Button>Order</Button>
          </NavLink>
          |<br></br>
          <br />
          <Outlet></Outlet>
        </div>
      </Fragment>
    );
  else return <FormDialog></FormDialog>; 
};
export default RootLayout;
