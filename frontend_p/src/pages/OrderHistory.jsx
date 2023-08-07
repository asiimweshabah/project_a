import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);
  const [username, setUsername] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);
  const deleteAllOrders = () => {
    setShowConfirmationModal(true);
  };

  const handleConfirmationClose = () => {
    setShowConfirmationModal(false);
  };

  const handleConfirmationProceed = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3006/orders/deleteOrders`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      await fetchData();
      toast.success("Order history cleared successfully!", {
        position: "top-center",
        autoClose: 2000,
      });
    } catch (error) {
      console.error(error);
    }
    setShowConfirmationModal(false);
  };

  async function fetchData() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:3006/orders`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setOrders(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  // Get current orders based on pagination, username, and date filter
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

  let filteredOrders = orders;

  if (username) {
    filteredOrders = filteredOrders.filter((order) =>
      order.Username.toLowerCase().includes(username.toLowerCase())
    );
  }

  if (selectedDate) {
    filteredOrders = filteredOrders.filter(
      (order) => order.order_date.split("T")[0] === selectedDate
    );
  }

  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
  };

  return (
    <div>
      <div className="order-container">
        <div className="row justify-content-center d-flex align-items-center">
          <div className="col-sm-12 col-xs-12 col-md-9">
            <div className="d-flex">
              <input
                className="form-control mb-4 w-50"
                placeholder="Search by UserName"
                value={username}
                onChange={handleUsernameChange}
              />
              <input
                type="date"
                className="form-control mx-3 mb-4 w-50"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th className="text-white">Names</th>
                  <th className="text-white">Product</th>
                  {/* <th className="text-white">Quantity</th> */}
                  {/* <th className="text-white">Price</th> */}

                  {/* <th className="text-white">Amount</th> */}
                  <th className="text-white">Total Amount</th>
                  <th className="text-white">Debt</th>
                  <th className="text-white">Date</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((order) => (
                  <tr key={order.username && order.order_date}>
                    <td>{order.Username}</td>

                    <td>
                      {order.orders.map((orderItem, index) => (
                        <div key={index} className="col-md-2">
                          <div> {orderItem}</div>
                        </div>
                      ))}
                    </td>
                    <td>{order.total_amount}</td>
                    <td>{order.debt}</td>
                    <td>
                      {format(new Date(order.order_date), "MMMM dd, yyyy")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="my-3 justify-content-between d-flex">
              <div>
                <button
                  onClick={() => deleteAllOrders()}
                  className="btn btn-danger"
                >
                  Clear OrderHistory
                </button>
              </div>

              <div className="pagination justify-content-end">
                {Array.from({
                  length: Math.ceil(filteredOrders.length / ordersPerPage),
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
          <Modal
            centered
            show={showConfirmationModal}
            onHide={handleConfirmationClose}
          >
            <Modal.Header closeButton>
              <Modal.Title>Confirm Clearing Order History</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to clear all order history?
            </Modal.Body>
            <Modal.Footer>
              <button
                className="btn btn-secondary"
                onClick={handleConfirmationClose}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={handleConfirmationProceed}
              >
                Proceed
              </button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}
