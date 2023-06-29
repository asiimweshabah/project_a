import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <section className="vh-100 justify-content-center align-items-center d-flex">
      <div className="">
        <h1>You are most welcome</h1>
        <Link style={{ textDecoration: "none" }} to={"/products"}>
          <div className="justify-content-center d-flex ">
            <button className="btn btn-lg text-white btn-light bg_btn">
              Make order
            </button>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Home;
