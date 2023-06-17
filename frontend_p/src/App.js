import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import Setpassword from "./Components/Setpassword";
import Outlets from "./Outlets";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import OrderHistory from "./pages/OrderHistory";
import PlaceOrder from "./pages/PlaceOrder";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Outlets />}>
          <Route path="/" exact element={<Home />} />
          {/* <Route path="/" exact element={<SideMenu />} /> */}
        </Route>
        <Route path="/setpassword" exact element={<Setpassword />} />
        <Route path="/login" exact element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/admin_users" element={<Admin />} />
        <Route path="/orders" element={<PlaceOrder />} />
        <Route path="/products" element={<Products />} />
        <Route path="/admin_orderhistory" element={<OrderHistory />} />
      </Routes>
    </div>
  );
}

export default App;
