import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Admin() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedUserType, setSelectedUserType] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, [selectedCompany, selectedUserType]);

  async function fetchUsers() {
    try {
      const response = await axios.get("http://localhost:3006/users/allUsers");
      const allUsers = response.data;

      let filteredUsers = allUsers;

      if (selectedCompany) {
        filteredUsers = filteredUsers.filter(
          (user) => user.Company === selectedCompany
        );
      }

      if (selectedUserType) {
        filteredUsers = filteredUsers.filter(
          (user) => user.UserType === selectedUserType
        );
      }

      setUsers(allUsers);
      setFilteredUsers(filteredUsers);
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteUser(Id) {
    try {
      const result = window.confirm("Deleting user?");
      if (result) {
        await axios.delete(`http://localhost:3006/users/deleteUser/${Id}`);
        await fetchUsers();
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function activateUser(userId) {
    try {
      await axios.put(`http://localhost:3006/users/activate/${userId}`);
      await fetchUsers();
    } catch (error) {
      console.error(error);
    }
  }

  async function deactivateUser(userId) {
    try {
      await axios.put(`http://localhost:3006/users/deactivate/${userId}`);
      await fetchUsers();
    } catch (error) {
      console.error(error);
    }
  }

  // Get the current users to display based on pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const [active, setActive] = useState(false);

  return (
    <div className="order-container">
      <div className="row justify-content-center d-flex align-items-center">
        <div className="col-sm-12 col-xs-12 col-md-9">
          <div className="d-flex">
            <select
              className="form-control mb-4 w-50"
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
            >
              <option value="">All Companies</option>
              <option value="Odysseytech">Odysseytech</option>
              <option value="UPTI">UPTI</option>
              <option value="Uganda Digital">Uganda Digital</option>
              {/* Add more options for different companies */}
            </select>

            <select
              className="form-control mx-3 mb-4 w-50"
              value={selectedUserType}
              onChange={(e) => setSelectedUserType(e.target.value)}
            >
              <option value="">All User Types</option>
              <option value="normal">Normal</option>
              <option value="admin">Admin</option>

              {/* Add more options for different user types */}
            </select>
          </div>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Names</th>
                <th>Company</th>
                <th>UserType</th>
                <th>Email</th>
                <th className="actions">Controls</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.Id}>
                  <td>{user.Username}</td>
                  <td>{user.Company}</td>
                  <td>{user.UserType}</td>
                  <td>{user.Email}</td>
                  <td className="w-100 d-flex justify-content-evenly">
                    <button
                      className="bg_btn btn-sm btn btn-success"
                      onClick={() => deleteUser(user.Id)}
                    >
                      Delete User
                    </button>
                    {/* <span onClick={() => setActive(!active)}>
                      {user.status === "active" ? (
                        <button
                          onClick={() => activateUser(user.Id)}
                          className="btn btn-sm btn-secondary w-100"
                        >
                          Activate User
                        </button>
                      ) : (
                        <button
                          onClick={() => deactivateUser(user.Id)}
                          className="btn bg_btn btn-sm text-white w-100"
                        >
                          Dectivate User
                        </button>
                      )}
                    </span> */}
                    <span onClick={() => setActive(!active)}>
                      {user.status === "active" ? (
                        <button
                          onClick={() => deactivateUser(user.Id)}
                          className="btn btn-sm btn-secondary w-100"
                        >
                          Deactivate User
                        </button>
                      ) : (
                        <button
                          onClick={() => activateUser(user.Id)}
                          className="btn bg_btn btn-sm text-white w-100"
                        >
                          Activate User
                        </button>
                      )}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="my-3 justify-content-between d-flex">
            <div>
              <Link to="/register">
                <button className="bg_btn btn btn-success">Add User</button>
              </Link>
            </div>
          </div>
          <div className="pagination justify-content-end">
            {Array.from({
              length: Math.ceil(filteredUsers.length / usersPerPage),
            }).map((item, index) => (
              <button
                key={index}
                className={`pagination-link btn mx-1 btn-primary ${
                  currentPage === index + 1 ? "active" : ""
                }`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
