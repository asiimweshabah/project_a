import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await axios.get(`http://localhost:3006/placeOrder`);
      setOrders(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteOrder(id) {
    try {
      await axios.delete(
        `http://localhost:3006/placeOrder/deleteProduct/${id}`
      );
      await fetchData();
    } catch (error) {
      console.error(error);
    }
  }

  function confirmDeleteOrder(id) {
    if (id) {
      deleteOrder(id);
    }
  }

  return (
    <div className="order-container">
      <div className="row justify-content-center d-flex align-items-center">
        <div className="col-lg-9 col-md-12 col-xs-11 col-sm-12">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th className="text-white">Names</th>
                <th className="text-white">Product</th>
                <th className="text-white">Quantity</th>
                <th className="actions text-white">Amount</th>
                <th className="text-white">Date</th>
              </tr>
            </thead>

            <tbody>
              {Array.isArray(orders) && orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.order_Id}>
                    <td className="w-25">{order.Username}</td>
                    <td className="w-25">{order.Product}</td>
                    <td className="w-25">{order.Quantity}</td>
                    <td className="w-25">{order.Amount}</td>
                    <td className="w-25">{order.Date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No orderHistory available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
