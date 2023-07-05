import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Sidenav.css";
import { Modal } from "react-bootstrap";

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState("");

  const [showModal, setShowModal] = useState(false);
  // const [userEmail, setUserEmail] = useState("");
  // const [userType, setUserType] = useState("");

  useEffect(() => {
    const checkLoggedIn = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
      // const email = localStorage.getItem("email");
      // setUserEmail(email || "");
      // const userType = localStorage.getItem("userType");
      // setUserType(userType || "");
    };

    checkLoggedIn();
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    toggleModal();
  };

  return (
    <nav className="nav-men mee fixed-top">
      <div class="container-fluid align-items-center justify-content-center d-flex">
        <ul class="w-50 justify-content-between d-flex align-items-center pt-3">
          {/* <div className=""> */}
          <div className="">
            <li className="navitems_2">
              <Link to="/products" className="Link ">
                My Orde
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
          </div>

          <div className="">
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
            <li className="navitems_2">
              {isLoggedIn ? (
                <Link onClick={toggleModal} className="Link">
                  Logout
                </Link>
              ) : (
                <Link to="/login" className="Link ">
                  Login
                </Link>
              )}
            </li>
          </div>
          {/* </div> */}
        </ul>
      </div>
      <div className="area-3">
        <div>
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
