import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import Outlets from "./Outlets";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Orders from "./pages/Orders";
import AddProduct from "./pages/AddProduct";
import OrderHistory from "./pages/OrderHistory";
import User from "./pages/User";

// import SideMenu from "./Menu/SideMenu";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Outlets />}>
          <Route path="/" exact element={<Home />} />
          {/* <Route path="/" exact element={<SideMenu />} /> */}
        </Route>
        <Route path="/login" exact element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/admin_users" element={<Admin />} />
        <Route path="/users" element={<User />} />
        <Route path="/addproducts" element={<Orders />} />
        <Route path="/orderHistory" element={<OrderHistory />} />
        <Route path="/admin_orderhistory" element={<OrderHistory />} />
      </Routes>
    </div>
  );
}

export default App;
