import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import "./Sidenav.css";
import axios from "axios";
import { AiOutlineOrderedList } from "react-icons/ai";
import { MdAccountCircle } from "react-icons/md";
import { RiFileHistoryFill, RiLogoutCircleFill } from "react-icons/ri";
import { Modal } from "react-bootstrap";
import { IconContext } from "react-icons";
import { BsFillPeopleFill } from "react-icons/bs";
import SignUp from "../Components/SignUp";
import Signin from "../Components/SignIn";

const SideMenu = () => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const [showModal, setShowModal] = useState(false);

  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3006/users/allUsers`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        return response.data;
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleLogout = () => {
    localStorage.clear();

    toggleModal();
  };

  useEffect(() => {
    const checkLoggedIn = () => {
      // const token = localStorage.getItem("token");
      // setIsLoggedIn(token ? true : false);
    };

    checkLoggedIn();
  }, []);

  return (
    <div className="col-auto col-md-3 col-xl-2 nav-container nav-top px-sm-2 px-0 ">
      <div className="d-flex justify-content-between align-items-center nav-container nav-top fixed-top py-3  px-4 container-fluid">
        <IconContext.Provider value={{ color: "#5f2781" }}>
          <div className="d-flex align-items-center">
            <div className="navbars d-flex align-items-center">
              <FaIcons.FaBars onClick={showSidebar} className="open" />
            </div>
            <nav className={!sidebar ? "nav-menu" : "nav-menu active"}>
              <ul className="nav-menu-items" onClick={showSidebar}>
                <div className="d-flex">
                  <h5 className="mt-3" id="logo">
                    OdysseyBreakSystem
                  </h5>
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

                  {localStorage.getItem("UserType") &&
                    localStorage.getItem("UserType") !== "normal" && (
                      <>
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

                        <li
                          onClick={() => setShowSignUpModal(true)}
                          className="navbar-item"
                        >
                          <Link
                            onClick={showModal}
                            className="Link  d-flex align-items-center"
                          >
                            <MdAccountCircle
                              className="ico mx-2"
                              style={{ fontSize: " 25px" }}
                            />
                            Add User
                          </Link>
                        </li>
                      </>
                    )}

                  <li className="navbar-item">
                    {/* {isLoggedIn ? ( */}
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
                </div>
              </ul>
            </nav>
          </div>
        </IconContext.Provider>
        <div className="area-3">
          <div className="d-flex align-items-center">
            <div className="align-items-center d-flex">
              {localStorage.getItem("Email")}
              <Link id="link" className="link mx-1">
                <MdAccountCircle
                  className="ico mx-2"
                  style={{ fontSize: "25px" }}
                />
              </Link>
            </div>
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
          <div>
            {showSignInModal && (
              <Modal
                centered
                show={showSignInModal}
                onHide={() => setShowSignInModal(false)}
              >
                <Modal.Header closeButton>
                  {/* <Modal.Title>Login</Modal.Title> */}
                </Modal.Header>
                <Modal.Body>
                  <Signin />
                </Modal.Body>
              </Modal>
            )}
          </div>
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
      </div>
    </div>
  );
};

export default SideMenu;
