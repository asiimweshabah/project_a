import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import SignUp from "../Components/SignUp";
import { CiMenuKebab } from "react-icons/ci";
import { toast } from "react-toastify";

export const Navbar = () => {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [isNavOpen, setNavOpen] = useState(false);
  const [userType, setUserType] = useState(localStorage.getItem("UserType"));
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    // Check for changes in UserType in localStorage and update the state accordingly
    setUserType(localStorage.getItem("UserType"));
  }, []);

  const toggleSignUpModal = () => {
    setShowSignUpModal(!showSignUpModal);
  };

  const toggleNav = () => {
    setNavOpen(!isNavOpen);
  };
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleLogout = () => {
    localStorage.clear();
    toggleModal();
    navigate("/");
    toast.success("Logged out successfully!", {
      position: "top-center",
      autoClose: 2000,
    });
  };

  return (
    <div>
      <nav className="fixed-top navbar px-4 navbar-expand-lg navbar-light bg-light">
        <h5 id="logo">OdysseyBreakSystem</h5>

        <button className="navbar-toggler" type="button" onClick={toggleNav}>
          <CiMenuKebab />
        </button>
        <div
          className={`justify-content-end collapse navbar-collapse ${
            isNavOpen ? "show" : ""
          }`}
        >
          <ul className="navbar-nav ml-auto d-flex align-items-center">
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

            {userType && userType !== "normal" && (
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
            <li className="nav-item">
              <Link onClick={toggleModal} className="nav-link Link">
                <button className="btn btn-danger">Logout</button>
              </Link>
            </li>
          </ul>
        </div>
        <Modal show={showModal} onHide={toggleModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Logging out</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to log out?</p>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn bg_btn text-white" onClick={toggleModal}>
              Cancel
            </button>
            <button
              className="btn btn-danger btn-primary"
              onClick={handleLogout}
            >
              Logout
            </button>
          </Modal.Footer>
        </Modal>
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
