import React from "react";
import { Outlet } from "react-router-dom";
import SideMenu from "./Menu/SideMenu";
const Outlets = () => {
  const userEmail = localStorage.getItem("userEmail");

  return (
    <div>
      <React.Fragment>
        <SideMenu email={userEmail} />
        <Outlet />
      </React.Fragment>
    </div>
  );
};

export default Outlets;
