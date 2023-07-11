// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate, useSearchParams } from "react-router-dom";

// const Newpassword = ({ email, code }) => {
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [message, setMessage] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const navigate = useNavigate();

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   const handleConfirmPasswordChange = (event) => {
//     setConfirmPassword(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     if (password !== confirmPassword) {
//       setMessage("Passwords do not match");
//       return;
//     }

//     console.log(searchParams);
//     axios
//       .post(`https://odysseytechbreaksystem.netlify.app/users/resetPassword`, {
//         email: `${searchParams.get("email")}`,
//         password,
//       })
//       .then((response) => {
//         setMessage(response.data.message);
//         navigate("/login");
//       })
//       .catch((error) => {
//         setMessage(error.response.data.error);
//       });
//   };

//   return (
//     <div>
//       <div className="container form_container d-flex align-items-center justify-content-center w-100">
//         <div className="form-grid w-100">
//           <form onSubmit={handleSubmit} className="justify-content-center form">
//             <div className="my-4">
//               <label htmlFor="password">Enter your new password:</label>
//               <input
//                 required
//                 placeholder="New Password"
//                 className="form-control w-50"
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={handlePasswordChange}
//               />
//             </div>
//             <div className="my-4">
//               <label htmlFor="confirmPassword">Confirm Password:</label>
//               <input
//                 required
//                 placeholder="Confirm Password"
//                 className="form-control w-50"
//                 type="password"
//                 id="confirmPassword"
//                 value={confirmPassword}
//                 onChange={handleConfirmPasswordChange}
//               />
//             </div>
//             <input
//               className="submit btn w-50 btn-danger mt-4 text-center mb-3"
//               type="submit"
//               value="Set New Password"
//               disabled={isSubmitting}
//             />
//             <p>{message}</p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Newpassword;
