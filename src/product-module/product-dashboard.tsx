import { FC, Fragment, useEffect } from "react";
import { Button } from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";

const ProductDashboard: FC = () => {
 
  return (    
    <Fragment> 
          <NavLink to="all" end>
            <Button>List Of Products</Button>
          </NavLink> 
          <br></br>
          <br />
          <Outlet></Outlet>
    </Fragment>

         );
};
export default ProductDashboard;
