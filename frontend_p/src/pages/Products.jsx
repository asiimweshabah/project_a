import React, { useState, useEffect } from "react";

import axios from "axios";
import { Modal } from "react-bootstrap";
import AddProduct from "./AddProduct";

export default function Products() {
  const [orders, setOrders] = useState([]);

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isProductSelected, setIsProductSelected] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const userType = localStorage.getItem("UserType");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:3006/products`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setOrders(response.data);

      const userResponse = await axios.get(
        `http://localhost:3006/users/allUsers`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (userResponse) {
        return userResponse;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteOrder(id) {
    try {
      const token = localStorage.getItem("token");
      const confirmed = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (confirmed) {
        await axios.delete(
          `http://localhost:3006/products/deleteProduct/${id}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        await fetchData();
        window.alert("Order deleted successfully!");
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

  const handleQuantityChange = (event, productId) => {
    const Quantity = parseInt(event.target.value);
    const updatedOrders = orders.map((order) => {
      if (order.product_Id === productId && order.selected) {
        const Amount = order.Price * Quantity;
        return {
          ...order,
          Quantity: Quantity,
          Amount: Amount,
        };
      }
      return order;
    });
    setOrders(updatedOrders);

    const selected = updatedOrders.filter((order) => order.selected);
    setSelectedProducts(selected);

    setIsProductSelected(selected.length > 0);
  };

  const handleCheckboxChange = (event, productId) => {
    const isChecked = event.target.checked;
    const updatedOrders = orders.map((order) => {
      if (order.product_Id === productId) {
        return {
          ...order,
          selected: isChecked,
        };
      }
      return order;
    });
    setOrders(updatedOrders);

    const selected = updatedOrders.filter((order) => order.selected);
    setSelectedProducts(selected);

    setIsProductSelected(selected.length > 0);
  };

  const placeOrder = async () => {
    const token = localStorage.getItem("token");
    console.log(selectedProducts);

    try {
      const selectedProductIds = selectedProducts.map(
        (product) => product.product_Id
      );

      const selectedProductData = {};
      selectedProducts.forEach((product) => {
        selectedProductData[product.product_Id] = {
          Product: product.Product,
          Price: product.Price,
          Quantity: product.Quantity,
          Amount: product.Amount,
          total_amount: product.total_amount,
        };
      });

      await axios.post(
        "http://localhost:3006/orders/placeOrder",
        { selectedProductIds, selectedProductData },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      // Update the products table with selected products and their quantities and amounts
      await axios.post(
        "http://localhost:3006/products/updateProducts",
        { selectedProductData },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setIsOrderPlaced(true);
      setSelectedProducts([]);
      window.alert("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const handleCancelModal = () => {
    setShowSignUpModal(false);
  };
  return (
    <div>
      <div className="order-container">
        <div className="row justify-content-center d-flex align-items-center">
          <div className="col-lg-9 col-md-8 col-xs-10 col-sm-10">
            <table className="table table-striped table-bordered">
              <thead>
                <tr className="text-white">
                  <th className="checkbox-column text-white">Product</th>

                  <th className="text-white">Quantity</th>
                  <th className="text-white">Amount</th>
                  <th className="text-white">Total Amount</th>
                  {userType !== "normal" && (
                    <th className="actions text-white">For Admins</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {Array.isArray(orders) && orders.length > 0 ? (
                  orders.map((order) => (
                    <tr key={order.product_Id}>
                      <td className="ordr-with">
                        <div className=" mt-1">
                          <input
                            className="checkbox-column mx-1"
                            type="checkbox"
                            checked={order.selected || false}
                            onChange={(event) =>
                              handleCheckboxChange(event, order.product_Id)
                            }
                          />
                          {order.Product}
                        </div>
                      </td>
                      <td className="ordr-with">
                        <select
                          className="form-control"
                          value={order.Quantity}
                          onChange={(event) =>
                            handleQuantityChange(event, order.product_Id)
                          }
                        >
                          <option value="">Select quantity</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </td>
                      <td className="ordr-with">
                        <div className="mt-2">
                          {order.Amount.toLocaleString()}
                        </div>
                      </td>
                      <td className="ordr-with ">
                        <div className="mt-2">
                          {order.total_amount.toLocaleString()}
                        </div>
                      </td>

                      {userType !== "normal" && (
                        <td className="actions ordr-with">
                          <button
                            onClick={() => confirmDeleteOrder(order.product_Id)}
                            className="d-flex mt-1 align-items-center btn btn-sm btn-danger"
                          >
                            Delete Product
                          </button>
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No Products? Click Add Product!</td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="my-3 justify-content-between d-flex">
              <div>
                {userType !== "normal" && (
                  <div className="d-flex justify-content">
                    <div>
                      <button
                        onClick={() => setShowSignUpModal(true)}
                        className="bg_btn btn btn-success"
                      >
                        Add Product
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="d-flex justify-content-end">
                <button
                  onClick={placeOrder}
                  className="bg_btn btn btn-success"
                  disabled={!isProductSelected || isOrderPlaced}
                >
                  Place order
                </button>
              </div>
            </div>
          </div>
          {showSignUpModal && (
            <Modal
              centered
              show={showSignUpModal}
              onHide={() => setShowSignUpModal(false)}
            >
              <Modal.Header closeButton>
                {/* <Modal.Title>Add User</Modal.Title> */}
              </Modal.Header>
              <Modal.Body>
                <AddProduct onClose={handleCancelModal} />
              </Modal.Body>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
}
