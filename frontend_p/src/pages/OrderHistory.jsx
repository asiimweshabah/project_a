import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);
  const [username, setUsername] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

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

  async function deleteAllOrders() {
    try {
      const result = window.confirm("Confirm clearing all order history?");
      const token = localStorage.getItem("token");
      if (result) {
        await axios.delete(`http://localhost:3006/orders/deleteOrders`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        await fetchData();
      }
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
    <div className="order-container">
      <div className="row justify-content-center d-flex align-items-center">
        <div className="col-lg-9 col-md-12 col-xs-11 col-sm-12">
          <div className="d-flex justify-content-between">
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
                <th className="text-white">Quantity</th>
                <th className="text-white">Amount</th>
                <th className="text-white">Date</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(currentOrders) && currentOrders.length > 0 ? (
                currentOrders.map((order) => (
                  <tr key={order.order_Id}>
                    <td className="T-width">{order.Username}</td>
                    <td className="T-width">{order.Product}</td>
                    <td className="T-width">{order.Quantity}</td>
                    <td className="T-width">{order.Amount}</td>
                    <td className="T-width">
                      {order.order_date.split("T")[0]}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No order history available for all users</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="my-3 justify-content-between d-flex">
            <div>
              <button
                onClick={() => deleteAllOrders()}
                className="bg_btn btn btn-success"
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
      </div>
    </div>
  );
}
