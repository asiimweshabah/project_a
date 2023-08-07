import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("normal");
  const [loginStatus, setLoginStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    let errorMessage = "";
    if (!email) {
      errorMessage = (
        <span className="text-danger border_R">
          "Email address must be given."
        </span>
      );
    } else if (!password) {
      errorMessage = (
        <span className="text-danger border_R">"Password must be given."</span>
      );
    }
    if (errorMessage) {
      setLoginStatus(errorMessage);
    } else {
      setIsSubmitting(true);
      setLoginStatus("");
      try {
        const response = await axios.post(`http://localhost:3006/users/login`, {
          email: email,
          password: password,
        });

        if (response.data.message === "User does not exist") {
          setLoginStatus("User does not exist");
        } else if (response.data.message && response.data.token) {
          console.log("response.data.user", response.data.user);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("UserType", response.data.user.UserType);
          localStorage.setItem("Email", response.data.user.Email);
          navigate("/products");
          toast.success("User logged in successfully!", {
            position: "top-center",
            autoClose: 2000, // The duration of the toast message in milliseconds
          });
        } else {
          setLoginStatus(response.data.error);
        }
      } catch (error) {
        console.error(error);
        setLoginStatus("Wrong password or username!");
      }
    }
  };

  const handleUserRegistration = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:3006/users/register`,
        {
          email: email,
          password: password,
          userType: userType,
        }
      );

      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        setLoginStatus("Account created successfully");
      }
    } catch (error) {
      console.error(error);
      setLoginStatus("Failed to create user account.");
    }
  };

  return (
    <div className="form-container form_bg">
      <form id="form" method="POST" action="/users/login" className="w-50">
        <div>
          <label htmlFor="email">
            Email
            <span style={{ fontSize: "20px" }} className="text-danger mx-1">
              *
            </span>
          </label>
          <input
            required
            placeholder="Email"
            className="form-control w-100"
            type="text"
            name={"email"}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">
            Password
            <span style={{ fontSize: "20px" }} className="text-danger mx-1">
              *
            </span>
          </label>
          <input
            required
            placeholder="Password"
            className="form-control w-100"
            type="password"
            name={"password"}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <input
          required
          onClick={login}
          type="submit"
          value="SignIn"
          className="submit btn w-100 btn-danger mt-4 text-center"
          disabled={isSubmitting}
        />
        <h1
          style={{
            fontSize: "15px",
            marginTop: "20px",
            border: "red",
          }}
        >
          {loginStatus}
        </h1>
        <span className="text-primary justify-content-end">
          <Link style={{ textDecoration: "none" }} to="/setpassword">
            Forgot password?
          </Link>
        </span>
      </form>
      {/* User registration form */}
      {loginStatus === "User does not exist. Would you like to register?" && (
        <form
          onSubmit={handleUserRegistration}
          className="form_container"
          style={{ marginTop: "20px" }}
        >
          <h2>Create Account</h2>
          <div>
            <label htmlFor="email">Email</label>
            <input
              required
              placeholder="Email"
              className="form-control w-100"
              type="text"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-3">
            <label htmlFor="userType">User Type:</label>
            <select
              className="form-control w-100"
              name="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="normal">Normal User</option>
              <option value="admin">Admin</option>
              <option value="superadmin">Super Admin</option>
            </select>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              required
              placeholder="Password"
              className="form-control w-100"
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input
            required
            type="submit"
            value="Create Account"
            className="submit btn w-100 btn-danger mt-4 text-center"
          />
        </form>
      )}
    </div>
  );
}
