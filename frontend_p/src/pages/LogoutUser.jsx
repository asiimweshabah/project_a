// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// export default function LogoutUser() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   async function fetchData() {
//     try {
//       const response = await axios.get("http://localhost:3006/users");
//       setUsers(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   async function deleteUser(id) {
//     try {
//       const result = window.confirm("Deleting user?");
//       if (result) {
//         await axios.delete(`http://localhost:3006/users/${id}`);
//         await fetchData();
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   function handleLogout() {
//     // Clear the user session or token here
//     // Example: localStorage.removeItem("token");

//     // Redirect the user to the login page

//     <Link to="/login"></Link>;
//   }

//   return (
//     <div>
//       <h1>User List</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Username</th>
//             <th>Email</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.Id}>
//               <td>{user.Id}</td>
//               <td>{user.Username}</td>
//               <td>{user.Email}</td>
//               <td>
//                 <button onClick={() => deleteUser(user.Id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// }
