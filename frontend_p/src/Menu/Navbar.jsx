import React from "react";
import { Link } from "react-router-dom";
import "./Sidenav.css";

export const Navbar = () => {
  return (
    <nav className="nav-men mee fixed-top">
      <div className="container-fluid align-items-center justify-content-center d-sm-flex d-md-flex">
        <ul className="w-50 justify-content-between d-sm-flex d-md-flex align-items-center pt-3">
          <li className="navitems_2">
            <Link to="/products" className="Link ">
              My Order
            </Link>
          </li>

          <li className="navitems_2">
            <Link to="/recent" className="Link ">
              Recent Orders
            </Link>
          </li>

          <li className="navitems_2">
            <Link to="/admin_orderhistory" className="Link">
              Order History
            </Link>
          </li>

          <li className="navitems_2">
            <Link to="/admin_users" className="Link">
              Users
            </Link>
          </li>

          <li className="navitems_2">
            <Link to="/register" className="Link">
              Add User
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
