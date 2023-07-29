import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import SignUp from "../Components/SignUp";
import { CiMenuKebab } from "react-icons/ci";
export const Navbar = () => {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [isNavOpen, setNavOpen] = useState(false);

  const toggleSignUpModal = () => {
    setShowSignUpModal(!showSignUpModal);
  };

  const toggleNav = () => {
    setNavOpen(!isNavOpen);
  };

  return (
    <div>
      <nav className="fixed-top navbar px-4 navbar-expand-lg navbar-light bg-light">
        <Link to="/" className="Link">
          <h5 id="logo">OdysseyBreakSystem</h5>
        </Link>
        <button className="navbar-toggler" type="button" onClick={toggleNav}>
          <CiMenuKebab />
        </button>
        <div
          className={`justify-content-end collapse navbar-collapse ${
            isNavOpen ? "show" : ""
          }`}
        >
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link
                to="/products"
                className="nav-link Link"
                onClick={toggleNav}
              >
                My Order
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/recent" className="nav-link Link" onClick={toggleNav}>
                Recent Orders
              </Link>
            </li>

            {localStorage.getItem("UserType") &&
              localStorage.getItem("UserType") !== "normal" && (
                <>
                  <li className="nav-item">
                    <Link
                      to="/admin_orderhistory"
                      className="nav-link Link"
                      onClick={toggleNav}
                    >
                      Order History
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      to="/admin_users"
                      className="nav-link Link"
                      onClick={toggleNav}
                    >
                      Users
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      to="#"
                      className="nav-link Link"
                      onClick={() => {
                        toggleSignUpModal();
                        toggleNav();
                      }}
                    >
                      Add User
                    </Link>
                  </li>
                </>
              )}
          </ul>
        </div>
      </nav>

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
    </div>
  );
};

export default Navbar;
