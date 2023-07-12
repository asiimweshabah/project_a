import React, { useState } from "react";
import axios from "axios";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [registerStatus, setRegisterStatus] = useState("");
  const [company, setCompany] = useState("");
  const [userType, setUserType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const signup = (e) => {
    const token = localStorage.getItem("token");

    e.preventDefault();

    let errorMessage = "";
    if (!username) {
      errorMessage = (
        <span className="text-danger border_R">"Username must be given."</span>
      );
    } else if (!email) {
      errorMessage = (
        <span className="text-danger border_R">
          "Email address must be given."
        </span>
      );
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errorMessage = (
        <span className="text-danger border_R">
          Invalid email address (Must contain @).
        </span>
      );
    } else if (!company) {
      errorMessage = (
        <span className="text-danger border_R">"Select your Company."</span>
      );
    } else if (!userType) {
      errorMessage = (
        <span className="text-danger border_R">"Select your userType."</span>
      );
    }
    if (errorMessage) {
      setRegisterStatus(errorMessage);
    } else {
      setIsSubmitting(true);
      setRegisterStatus("");

      // Send verification code to the user's email
      axios
        .post(
          `  http://localhost:3006/users/register`,
          {
            username: username,
            email: email,
            company: company,
            userType: userType,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((response) => {
          if (response.data.error) {
            // Email already exists in the database
            setRegisterStatus(response.data.error);
          } else {
            setRegisterStatus("Account created successfully");
          }
        })
        .catch((error) => {
          // console.error("Failed to register user:", error);
          setRegisterStatus("User already exists");
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  };

  return (
    <form className="form w-100  px-5" action="">
      <div className="my-3">
        <label htmlFor="username">
          Username
          <span style={{ fontSize: "20px" }} className="text-danger mx-1">
            *
          </span>
        </label>
        <input
          required
          placeholder="username"
          className="form-control w-100"
          type="text"
          name={"username"}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="my-3">
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
          type={"email"}
          name={"email"}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="my-3">
        <label htmlFor="company">
          Company
          <span style={{ fontSize: "20px" }} className="text-danger mx-1">
            *
          </span>
        </label>
        <select
          required
          className="form-control w-100"
          name="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        >
          <option value="">Select Company</option>
          <option value="Odysseytech">Odysseytech</option>
          <option value="Uganda Digital">Uganda Digital</option>
          <option value="UPTI">UPTI</option>
        </select>
      </div>
      <div className="my-3">
        <label htmlFor="userType">User Type:</label>
        <select
          className="form-control w-100"
          name="userType"
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
        >
          <option value="">Select Usertype</option>
          <option value="normal">Normal User</option>
          <option value="admin">Admin</option>
          <option value="superadmin">Super Admin</option>
        </select>
      </div>

      <input
        onClick={signup}
        type="submit"
        value="Send Verification Code"
        name="signup"
        className="submit btn w-100 btn-danger mt-4 text-center"
        disabled={isSubmitting}
      />
      <h1 style={{ fontSize: "15px", marginTop: "20px" }}>{registerStatus}</h1>
    </form>
  );
}
