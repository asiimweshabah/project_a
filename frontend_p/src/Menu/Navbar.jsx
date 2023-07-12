import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidenav.css";
import { Modal } from "react-bootstrap";
import SignUp from "../Components/SignUp";
export const Navbar = () => {
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  return (
    <nav className="nav-men mee fixed-top px-4">
      <div className="container-fluid align-items-center justify-content-between d-sm-flex d-md-flex">
        <h4 id="logo">Odyssey</h4>

        <ul className=" justify-content-between d-sm-flex d-md-flex align-items-center pt-3">
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

          <li onClick={() => setShowSignUpModal(true)} className="navitems_2">
            <Link className="Link"> Add User</Link>
          </li>
        </ul>
      </div>
      {showSignUpModal && (
        <Modal
          centered
          show={showSignUpModal}
          onHide={() => setShowSignUpModal(false)}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <SignUp />
          </Modal.Body>
        </Modal>
      )}
    </nav>
  );
};

export default Navbar;
