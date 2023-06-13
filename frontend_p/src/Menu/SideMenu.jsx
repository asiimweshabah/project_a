import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import "./Sidenav.css";
import { AiOutlineHome, AiOutlinePhone } from "react-icons/ai";
import { GiNewShoot } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";

import { IconContext } from "react-icons";

const SideMenu = () => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  return (
    // <div class="container-fluid">
    // {/* <div class="row flex-nowrap"> */}
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
                      <AiOutlineHome
                        className="ico mx-2"
                        style={{ fontSize: "20px" }}
                      />
                      Add Product
                    </Link>
                  </li>
                  <li className="navbar-item">
                    <Link
                      to="/orders"
                      className="Link d-flex align-items-center"
                    >
                      <AiOutlineHome
                        className="ico mx-2"
                        style={{ fontSize: "20px" }}
                      />
                      My Order
                    </Link>
                  </li>
                  <li className="navbar-item">
                    <Link
                      to="/orderHistory"
                      className="Link  d-flex align-items-center"
                    >
                      <AiOutlineHome
                        className="ico mx-2"
                        style={{ fontSize: "20px" }}
                      />
                      Recent Orders
                    </Link>
                  </li>

                  <li className="navbar-item">
                    <Link
                      to="/admin_users"
                      className="Link  d-flex align-items-center"
                    >
                      <GiNewShoot
                        className="ico mx-2"
                        style={{ fontSize: "20px" }}
                      />
                      Users
                    </Link>
                  </li>

                  <li className="navbar-item">
                    <Link
                      to="/admin_orderhistory"
                      className="Link  d-flex align-items-center"
                    >
                      <AiOutlinePhone
                        className="ico mx-2"
                        style={{ fontSize: " 20px" }}
                      />
                      Order History
                    </Link>
                  </li>

                  <li className="navbar-item">
                    <Link
                      to="/logout"
                      className="Link  d-flex align-items-center"
                    >
                      <CgProfile
                        className="ico mx-2"
                        style={{ fontSize: " 20px" }}
                      />
                      Account
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
              <Link id="link" className="link mx-2" to="/register">
                Add User
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import * as FaIcons from "react-icons/fa";
// import * as AiIcons from "react-icons/ai";
// import "./Sidenav.css";
// import { AiOutlineHome, AiOutlinePhone } from "react-icons/ai";
// import { FcAbout } from "react-icons/fc";
// import { GiNewShoot } from "react-icons/gi";
// import { CgProfile } from "react-icons/cg";
// import Home from "../pages/Home";

// const SideMenu = () => {
//   const [sidebar, setSidebar] = useState(false);
//   const showSidebar = () => setSidebar(!sidebar);
//   return (
//     <div>
//       <div class="container-fluid">
//         <div class="row flex-nowrap">
//           <div class="col-auto col-md-3 col-xl-2 nav-container nav-top px-sm-2 px-0 ">
//             <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
//               <FaIcons.FaBars onClick={showSidebar} className="open" />
//               <h4 id="logo">Odyssey</h4>
//               {/* </div> */}
//               <ul className="nav-menu-items">
//                 <div className="d-flex">
//                   <h4 className="mt-4" id="logo">
//                     Odyssey
//                   </h4>
//                   <p className="navbar-item">
//                     <Link className="close">
//                       <AiIcons.AiOutlineClose />
//                     </Link>
//                   </p>
//                 </div>
//                 <li className="navbar-item">
//                   <Link to="/order" className="Link">
//                     <AiOutlineHome
//                       className="ico"
//                       style={{ fontSize: "20px" }}
//                     />
//                     Place Order
//                   </Link>
//                 </li>

//                 <li className="navbar-item">
//                   <Link to="/users" className="Link">
//                     <FcAbout className="ico " style={{ fontSize: "20px" }} />
//                     Users
//                   </Link>
//                 </li>
//                 <li className="navbar-item">
//                   <Link to="/admin" className="Link">
//                     <GiNewShoot className="ico" style={{ fontSize: "20px" }} />
//                     Admin(activate and deactives)
//                   </Link>
//                 </li>
//                 <li className="navbar-item">
//                   <Link to="/contact" className="Link">
//                     <AiOutlinePhone
//                       className="ico"
//                       style={{ fontSize: " 20px" }}
//                     />
//                     Daily Orders
//                   </Link>
//                 </li>
//                 <li className="navbar-item">
//                   <Link to="/history" className="Link">
//                     <AiOutlinePhone
//                       className="ico"
//                       style={{ fontSize: " 20px" }}
//                     />
//                     Order History
//                   </Link>
//                 </li>

//                 <li className="navbar-item">
//                   <Link to="/login" className="Link">
//                     <CgProfile className="ico" style={{ fontSize: " 20px" }} />
//                     Sign out
//                   </Link>
//                 </li>
//               </ul>
//               <hr />
//             </div>
//           </div>
//           <Home />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SideMenu;
