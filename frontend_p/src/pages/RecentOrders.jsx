import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function RecentOrders() {
  const [orders, setOrders] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedQuantities, setSelectedQuantities] = useState({});
  const navigate = useNavigate();

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

  function handleProductSelection(event, productId) {
    const { checked } = event.target;
    if (checked) {
      setSelectedProducts((prevSelected) => [...prevSelected, productId]);
    } else {
      setSelectedProducts((prevSelected) =>
        prevSelected.filter((selectedId) => selectedId !== productId)
      );
    }
  }

  function handleQuantitySelection(event, orderId) {
    const { value } = event.target;
    setSelectedQuantities((prevSelected) => ({
      ...prevSelected,
      [orderId]: value,
    }));
  }

  async function placeOrder() {
    try {
      const orderData = {
        products: selectedProducts,
        quantities: selectedQuantities,
      };
      await axios.post(`http://localhost:3006/orders/create/order`, orderData);
      setSelectedProducts([]);
      setSelectedQuantities({});
      fetchData();
      alert("Order placed successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to place the order. Please try again.");
    }
  }

  return (
    <div className="order-container">
      <div className="row justify-content-center d-flex align-items-center">
        <div className="col-lg-9 col-md-12 col-xs-12 col-sm-12">
          <h2>Recent Orders</h2>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
              </tr>
            </thead>

            <tbody>
              {Array.isArray(orders) && orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.Id}>
                    <td className="w-25">
                      <input
                        type="checkbox"
                        value={order.Id}
                        onChange={(event) =>
                          handleProductSelection(event, order.Id)
                        }
                      />
                      {order.Product}
                    </td>
                    <td className="w-25">
                      <select
                        className="form-control"
                        value={selectedQuantities[order.Id] || ""}
                        onChange={(event) =>
                          handleQuantitySelection(event, order.Id)
                        }
                      >
                        <option value="">Select quantity</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">No orders? Please add an order.</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="my-3 justify-content-between d-flex">
            <div>
              <button
                onClick={placeOrder}
                className="bg_btn btn btn-success"
                disabled={selectedProducts.length === 0}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}