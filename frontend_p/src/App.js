import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Setpassword from "./Components/Setpassword";
import Outlets from "./Outlets";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Products from "./pages/Products";
import OrderHistory from "./pages/OrderHistory";
import Recent from "./pages/Recent";
import Navbar from "./Menu/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Outlets />}>
          <Route path="/" exact element={<Home />} />
        </Route>
        <Route path="/admin_users" element={<Admin />} />
        <Route path="/products" element={<Products />} />
        <Route path="/recent" element={<Recent />} />
        <Route path="/admin_orderhistory" element={<OrderHistory />} />
        <Route path="/setpassword" element={<Setpassword />} />
      </Routes>
    </div>
  );
}

export default App;
