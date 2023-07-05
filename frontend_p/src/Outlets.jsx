import React from "react";
import { Outlet } from "react-router-dom";
import SideMenu from "./Menu/SideMenu";
// import Navbar from "./Menu/Navbar";
const Outlets = () => {
  return (
    <div>
      <React.Fragment>
        <SideMenu />
        {/* <Navbar /> */}
        <Outlet />
      </React.Fragment>
    </div>
  );
};

export default Outlets;
