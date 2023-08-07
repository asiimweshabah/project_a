import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
export default function Orders() {
  const [usersOrders, setUsersOrders] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState({});

  useEffect((users_Id) => {
    getOrdersByUser(users_Id);
  }, []);
  const deleteUserOrder = (Id, total_amount) => {
    setShowConfirmationModal(true); // Show the confirmation modal
    // Save the Id and total_amount of the order to be deleted in a state variable
    // so that we can access it inside the confirmation modal
    setOrderToDelete({ Id, total_amount });
  };

  async function getOrdersByUser(users_Id) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3006/orders/myOrders/${users_Id}`,
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

  const handleDeleteConfirmed = async (Id, total_amount) => {
    setShowConfirmationModal(false); // Hide the confirmation modal
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:3006/orders/deleteMyOrders/${Id}?total_amount=${total_amount}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      // Filter out the deleted order from the local state
      setUsersOrders((prevOrders) =>
        prevOrders.filter(
          (order) =>
            order.users_Id !== Id || order.total_amount !== total_amount
        )
      );
      toast.success("Order deleted successfully!", {
        position: "top-center",
        autoClose: 2000,
      });
    } catch (error) {
      toast.error("Failed to delete order. Please try again.", {
        position: "top-center",
        autoClose: 2000,
      });
      console.error(error);
    }
  };

  return (
    <div>
      <div className="order-container">
        <div className="row justify-content-center d-flex align-items-center">
          <div className="col-lg-8 col-md-8 col-xs-12 col-sm-12">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th className="text-white">Product</th>
                  {/* <th className="text-white">Price</th>
                  <th className="text-white">Quantity</th> */}
                  <th className="text-white">Order Date</th>
                  <th className="actions text-white">Total amount</th>{" "}
                  {/* Fix the typo in "Total amount" */}
                  <th className="actions text-white">Delete Order</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(usersOrders) && usersOrders.length > 0 ? (
                  usersOrders.map((order) => (
                    <tr key={order.order_date}>
                      {/* <td className="ordr-with">{order.Product}</td>
                      <td className="ordr-with">{order.Price}</td> */}
                      <td className="ordr-with">
                        {order.orders.map((orderItem, index) => (
                          <div key={index}>{orderItem}</div>
                        ))}
                      </td>
                      <td className="ordr-with">
                        {format(new Date(order.order_date), "MMMM d, yyyy")}
                      </td>
                      <td className="ordr-with">{order.total_amount}</td>
                      <td className="ordr-with">
                        <button
                          className="btn-danger btn-sm btn"
                          onClick={() =>
                            deleteUserOrder(order.users_Id, order.total_amount)
                          }
                        >
                          Delete Order
                        </button>
                      </td>
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
        <Modal
          show={showConfirmationModal}
          onHide={() => setShowConfirmationModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirm Order Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this order?</Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-secondary"
              onClick={() => setShowConfirmationModal(false)}
            >
              Cancel
            </button>
            <button
              className="btn btn-danger"
              onClick={() =>
                handleDeleteConfirmed(
                  orderToDelete.Id,
                  orderToDelete.total_amount
                )
              }
            >
              Delete
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
