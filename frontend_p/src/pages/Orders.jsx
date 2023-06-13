import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await axios.get(`http://localhost:3006/orders`);
      setOrders(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteOrder(id) {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this order?"
      );
      if (confirmed) {
        await axios.delete(`http://localhost:3006/orders/deleteProduct/${id}`);
        await fetchData();
      }
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
        <div className="col-lg-9 col-md-8 col-xs-10 col-sm-10">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th className="actions">Controls</th>
              </tr>
            </thead>

            <tbody>
              {Array.isArray(orders) && orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.Id}>
                    <td className="w-25">{order.Product}</td>
                    <td className="w-25">{order.Price}</td>

                    <td className="actions w-25">
                      <div className="flex-row gap-4">
                        <button
                          onClick={() => confirmDeleteOrder(order.Id)}
                          className="btn btn-sm btn-danger"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No Products? Click Add Product!!.</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="my-3 justify-content-between d-flex">
            <div>
              <Link to="/addproduct">
                <button className="bg_btn btn btn-success">Add Product</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
