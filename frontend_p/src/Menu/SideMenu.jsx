import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import "./Sidenav.css";
import { AiOutlineOrderedList } from "react-icons/ai";
import { MdAccountCircle } from "react-icons/md";
import {
  RiFileHistoryFill,
  RiLoginCircleFill,
  RiLogoutCircleFill,
} from "react-icons/ri";
import { Modal } from "react-bootstrap";
import { IconContext } from "react-icons";
import { BsFillPeopleFill } from "react-icons/bs";

const SideMenu = () => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userType, setUserType] = useState("");
  useEffect(() => {
    const checkLoggedIn = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
      const email = localStorage.getItem("email");
      setUserEmail(email || "");
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
    <div className="col-auto col-md-3 col-xl-2 nav-container nav-top px-sm-2 px-0 ">
      <div className="d-flex justify-content-between align-items-center nav-container nav-top fixed-top py-3  px-4 container-fluid">
        <IconContext.Provider value={{ color: "#5f2781" }}>
          <div className="d-flex align-items-center">
            <div className="navbars d-flex align-items-center">
              <FaIcons.FaBars onClick={showSidebar} className="open" />

              <h4 id="logo">Odyssey</h4>
            </div>
            <nav className={!sidebar ? "nav-menu" : "nav-menu active"}>
              <ul className="nav-menu-items" onClick={showSidebar}>
                <div className="d-flex">
                  <h4 className="mt-4" id="logo">
                    Odyssey
                  </h4>
                  <p className="navbar-item">
                    <Link className="close">
                      <AiIcons.AiOutlineClose />
                    </Link>
                  </p>
                </div>
                <div className="my-5">
                  <li className="navbar-item">
                    <Link
                      to="/products"
                      className="Link  d-flex align-items-center"
                    >
                      <AiOutlineOrderedList
                        className="ico mx-2"
                        style={{ fontSize: "25px" }}
                      />
                      My Order
                    </Link>
                  </li>

                  <li className="navbar-item">
                    <Link
                      to="/recent"
                      className="Link  d-flex align-items-center"
                    >
                      <AiOutlineOrderedList
                        className="ico mx-2"
                        style={{ fontSize: "25px" }}
                      />
                      Recent Orders
                    </Link>
                  </li>

                  <li className="navbar-item">
                    <Link
                      to="/admin_orderhistory"
                      className="Link  d-flex align-items-center"
                    >
                      <RiFileHistoryFill
                        className="ico mx-2"
                        style={{ fontSize: "25px" }}
                      />
                      Order History
                    </Link>
                  </li>

                  <li className="navbar-item">
                    <Link
                      to="/admin_users"
                      className="Link  d-flex align-items-center"
                    >
                      <BsFillPeopleFill
                        className="ico mx-2"
                        style={{ fontSize: "25px" }}
                      />
                      Users
                    </Link>
                  </li>

                  <li className="navbar-item">
                    <Link
                      to="/register"
                      onClick={toggleModal}
                      className="Link  d-flex align-items-center"
                    >
                      <MdAccountCircle
                        className="ico mx-2"
                        style={{ fontSize: " 25px" }}
                      />
                      Add User
                    </Link>
                  </li>
                  <li className="navbar-item">
                    {isLoggedIn ? (
                      <li className="navbar-item">
                        <Link
                          onClick={toggleModal}
                          className="Link  d-flex align-items-center"
                        >
                          <RiLogoutCircleFill
                            className="ico mx-2"
                            style={{ fontSize: " 25px" }}
                          />
                          Logout
                        </Link>
                      </li>
                    ) : (
                      <li className="navbar-item">
                        <Link
                          to="/login"
                          className="Link  d-flex align-items-center"
                        >
                          <RiLoginCircleFill
                            className="ico mx-2"
                            style={{ fontSize: " 25px" }}
                          />
                          Login
                        </Link>
                      </li>
                    )}
                  </li>
                </div>
              </ul>
            </nav>
          </div>
        </IconContext.Provider>
        <div className="area-3">
          <div className="d-flex align-items-center">
            <div className="align-items-center d-flex">
              <Link id="link" className="link mx-1">
                <MdAccountCircle
                  className="ico mx-2"
                  style={{ fontSize: "25px" }}
                />
                {isLoggedIn && <p>{userEmail}</p>}
              </Link>
            </div>
          </div>
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
      </div>
    </div>
  );
};

export default SideMenu;
