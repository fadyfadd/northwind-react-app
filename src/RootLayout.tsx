import React, { FC, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, NavLink, Outlet } from "react-router-dom";
import { RootState } from "./store/store";
import FormDialog from "./login-form";
import { logout } from "./store/authentication-slice";
import { Button } from "@mui/material";
import ProgressScreen from "./progress-screen";

const RootLayout: FC = () => {
  var authentication = useSelector(
    (selector: RootState) => selector.authentication
  );

  var dispatcher = useDispatch();

  function logoutAction() {
    dispatcher(logout());
  }

  var ui = useSelector((state:RootState)=>state.ui)

  if (authentication.token)
    return (
      <Fragment>
        <ProgressScreen open={false}></ProgressScreen>
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
  else
    return (
      <Fragment>
        <ProgressScreen open={ui.isLoaderActive}></ProgressScreen>
        <FormDialog></FormDialog>
      </Fragment>
    );
};
export default RootLayout;
