import { FC, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { RootState } from "../store/store";
import LoginScreen from "./login-form";
import { logout } from "../store/authentication-slice";
import { Button } from "@mui/material";
import ProgressScreen from "./progress-screen";
import AppSnackBar from "./app-snack-bar";

const RootLayout: FC = () => {
  var authSelector = useSelector(
    (selector: RootState) => selector.authentication
  );

  var dispatch = useDispatch();

  function logoutAction() {
    dispatch(logout());
  }

  var uiSelector = useSelector((state: RootState) => state.ui);

  if (authSelector.token)
    return (
      <div style={{margin:'10px'}}>
        <Fragment>
          <AppSnackBar
            message={uiSelector.message.value}
            type={uiSelector.message.type}
          ></AppSnackBar>
          <ProgressScreen open={uiSelector.isLoaderActive}></ProgressScreen>
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
      </div>
    );
  else
    return (
      <Fragment>
        <AppSnackBar
          message={uiSelector.message.value}
          type={uiSelector.message.type}
        ></AppSnackBar>
        <ProgressScreen open={uiSelector.isLoaderActive}></ProgressScreen>
        <LoginScreen></LoginScreen>
      </Fragment>
    );
};
export default RootLayout;
