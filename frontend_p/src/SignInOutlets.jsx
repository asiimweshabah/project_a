import React from "react";
import { Outlet } from "react-router-dom";
// import SignIn from "./Components/SignIn";
import Navbar from "./Menu/Navbar";

const Outlets = () => {
  return (
    <div>
      <React.Fragment>
        <Navbar />
        <Outlet />
      </React.Fragment>
    </div>
  );
};

export default Outlets;
