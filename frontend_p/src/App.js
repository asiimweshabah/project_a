import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Setpassword from "./Components/Setpassword";
import Outlets from "./Outlets";
import Admin from "./pages/Admin";
import Products from "./pages/Products";
import OrderHistory from "./pages/OrderHistory";
import Recent from "./pages/Recent";
import SignInOutlets from "./SignInOutlets";
import SignIn from "./Components/SignIn";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/main-app" element={<Outlets />}></Route>

        <Route element={<SignInOutlets />}>
          <Route path="/admin_users" element={<Admin />} />
          <Route path="/products" element={<Products />} />
          <Route path="/recent" element={<Recent />} />
          <Route path="/admin_orderhistory" element={<OrderHistory />} />
          <Route path="/setpassword" element={<Setpassword />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
