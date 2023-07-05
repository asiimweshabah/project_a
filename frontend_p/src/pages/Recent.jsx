import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";

export default function Orders() {
  const [usersOrders, setUsersOrders] = useState([]);

  useEffect(() => {
    getOrdersByUser();
  }, []);

  async function getOrdersByUser(userId) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3006/orders/myOrders/${userId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setUsersOrders(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <div className="order-container">
        <div className="row justify-content-center d-flex align-items-center">
          <div className="col-lg-9 col-md-12 col-xs-11 col-sm-12">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th className="text-white">Product</th>
                  <th className="text-white">Quantity</th>
                  <th className="actions text-white">Amount</th>
                  <th className="text-white">Date</th>
                  {/* <th className="actions text-white">Debt</th> */}
                </tr>
              </thead>

              <tbody>
                {Array.isArray(usersOrders) && usersOrders.length > 0 ? (
                  usersOrders.map((order) => (
                    <tr key={order.product_Id}>
                      <td className="ordr-with">{order.Product}</td>
                      <td className="ordr-with">{order.Quantity}</td>
                      <td className="ordr-with">{order.Amount}</td>
                      <td className="ordr-with">
                        {order.order_date.split("T")[0]}
                      </td>
                      {/* <td className="ordr-with">{order.debt}</td> */}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No recent orders available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
