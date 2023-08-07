import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import SignUp from "../Components/SignUp";
import { format } from "date-fns";
import { toast } from "react-toastify";

function Admin() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedUserType, setSelectedUserType] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [userActivationStatus, setUserActivationStatus] = useState({});
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);
  const [deletingUserId, setDeletingUserId] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    // Retrieve user activation status from local storage
    const storedActivationStatus = localStorage.getItem("userActivationStatus");
    if (storedActivationStatus) {
      setUserActivationStatus(JSON.parse(storedActivationStatus));
    }
    // filterUsers();
  }, [selectedCompany, selectedUserType]);

  const deleteUser = (userId) => {
    setDeletingUserId(userId);
    setShowDeleteConfirmationModal(true);
  };

  const handleDeleteConfirmationClose = () => {
    setShowDeleteConfirmationModal(false);
  };
  async function fetchUsers() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:3006/users/allUsers`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const allUsers = response.data;
      setUsers(allUsers);
      filterUsers(allUsers);
    } catch (error) {
      console.error(error);
    }
  }

  function filterUsers(allUsers = users) {
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
    setFilteredUsers(filteredUsers);
  }

  const handleDeleteConfirmationProceed = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:3006/users/deleteUser/${deletingUserId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      await fetchUsers();
      toast.success("User deleted successfully!", {
        position: "top-center",
        autoClose: 2000,
      });
    } catch (error) {
      console.error(error);
    }
    setShowDeleteConfirmationModal(false);
  };

  const toggleUserActivation = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const userIsActive = userActivationStatus[userId];

      if (userIsActive) {
        await axios.put(
          `http://localhost:3006/users/deactivate/${userId}`,
          {},
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
      } else {
        await axios.put(
          `http://localhost:3006/users/activate/${userId}`,
          {},
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
      }

      const updatedActivationStatus = {
        ...userActivationStatus,
        [userId]: !userIsActive,
      };
      setUserActivationStatus(updatedActivationStatus);

      // Save the updated activeUsers array to local storage
      localStorage.setItem(
        "userActivationStatus",
        JSON.stringify(updatedActivationStatus)
      );

      // Fetch the updated user list
      await fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  // Get the current users to display based on pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
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
              </select>

              <select
                className="form-control mx-3 mb-4 w-50"
                value={selectedUserType}
                onChange={(e) => setSelectedUserType(e.target.value)}
              >
                <option value="">All User Types</option>
                <option value="normal">Normal</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th th="true" className="text-white">
                    Names
                  </th>
                  <th th="true" className="text-white">
                    Company
                  </th>
                  <th th="true" className="text-white">
                    UserType
                  </th>
                  <th th="true" className="text-white">
                    Email
                  </th>
                  <th th="true" className="text-white">
                    Joining Date
                  </th>
                  <th th="true" className="actions text-white">
                    For Admins
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
                  <tr key={user.users_Id}>
                    <td>{user.Username}</td>
                    <td>{user.Company}</td>
                    <td>{user.UserType}</td>
                    <td>{user.Email}</td>
                    <td>
                      {format(new Date(user.dateOfJoining), "MMMM d, yyyy")}
                    </td>
                    <td className="w-100 d-flex justify-content-evenly">
                      <button
                        className="bg_btn btn-sm btn btn-success"
                        onClick={() => deleteUser(user.users_Id)}
                      >
                        Delete User
                      </button>
                      <span className="justify-content-start">
                        {userActivationStatus[user.users_Id] ? (
                          <div>
                            <button
                              onClick={() =>
                                toggleUserActivation(user.users_Id)
                              }
                              className="btn-width btn bg_btn btn-sm text-white w-100"
                            >
                              Activate User
                            </button>
                          </div>
                        ) : (
                          <div>
                            <button
                              onClick={() =>
                                toggleUserActivation(user.users_Id)
                              }
                              className="btn btn-sm btn-danger w-100"
                            >
                              Deactivate User
                            </button>
                          </div>
                        )}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="my-3 justify-content-between d-flex">
              <div>
                {/* <Link to="/register">
                  <button className="bg_btn btn btn-success">Add User</button>
                </Link> */}
                <button
                  onClick={() => setShowSignUpModal(true)}
                  className="bg_btn btn btn-success"
                >
                  Add User
                </button>
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
        {showSignUpModal && (
          <Modal
            centered
            show={showSignUpModal}
            onHide={() => setShowSignUpModal(false)}
          >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <SignUp />
            </Modal.Body>
          </Modal>
        )}
      </div>
      <Modal
        centered
        show={showDeleteConfirmationModal}
        onHide={handleDeleteConfirmationClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm User Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-secondary"
            onClick={handleDeleteConfirmationClose}
          >
            Cancel
          </button>
          <button
            className="btn btn-danger"
            onClick={handleDeleteConfirmationProceed}
          >
            Delete
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Admin;
