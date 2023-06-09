import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <section className="vh-100 justify-content-center align-items-center d-flex">
      <div className="">
        <h1>You are most welcome</h1>
        <Link to={"/login"}>
          <div className="justify-content-center d-flex ">
            <button className="btn btn-lg text-white btn-light bg_btn">
              Sign In
            </button>
          </div>
        </Link>
        {/* <div className="justify-content-center">
          <span className="text-primary">Don't have an acount?Sign UP</span>
        </div> */}
      </div>
    </section>
  );
};

export default Home;
