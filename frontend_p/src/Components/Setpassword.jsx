import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
const Setpassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    console.log(searchParams);
    axios
      .post(`http://localhost:3006/users/setpassword`, {
        email: `${searchParams.get("email")}`,
        password,
      })
      .then((response) => {
        setMessage(response.data.message);
        navigate("/", { state: { showSignInModal: false } });
      })

      .catch((error) => {
        setMessage(error.response.data.error);
      });
  };

  return (
    <div>
      <div className="form-container form_bg">
        <form id="form" onSubmit={handleSubmit} className=" w-50">
          <div>
            <label htmlFor="password">Enter Password:</label>
            <input
              required
              placeholder="Password"
              className="form-control w-100"
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="my-4">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              required
              placeholder="Confirm Password"
              className="form-control w-100"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </div>
          <input
            className="submit btn w-100 btn-danger mt-4 text-center mb-3"
            type="submit"
            value="Set password"
          />
          <p>{message}</p>
        </form>
      </div>
    </div>
  );
};

export default Setpassword;
