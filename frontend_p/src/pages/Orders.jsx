// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// export default function Orders() {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   async function fetchData() {
//     try {
//       const response = await axios.get(`http://localhost:3006/orders`);
//       setOrders(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   async function deleteOrder(id) {
//     try {
//       await fetchData();
//       await axios.delete(`http://localhost:3006/orders/deleteProduct/${id}`);
//     } catch (error) {
//       console.error(error);
//     }
//   }
//   function confirmDeleteOrder(id) {
//     const result = window.confirm("Deleting order?");
//     if (result) {
//       deleteOrder(id);
//     }
//   }

//   async function editOrder(orderId, updatedOrder) {
//     try {
//       await axios.put(`http://localhost:3006/orders/${orderId}`, updatedOrder);
//       await fetchData();
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   return (
//     <div className="order-container">
//       <div className="row justify-content-center d-flex align-items-center">
//         <div className="col-lg-9 col-md-12">
//           <table className="table table-striped table-bordered">
//             <thead>
//               <tr>
//                 <th>Product</th>
//                 <th>Price</th>
//                 <th>Quantity</th>
//                 <th className="actions">Amount</th>
//                 <th className="actions">Controls</th>
//               </tr>
//             </thead>

//             <tbody>
//               {Array.isArray(orders) && orders.length > 0 ? (
//                 orders.map((order) => (
//                   <tr key={order.Id}>
//                     <td className="w-25">{order.Product}</td>
//                     <td className="w-25">{order.Price}</td>
//                     <td className="w-25">{order.Quantity}</td>
//                     <td className="w-25">{order.Amount}</td>
//                     <td className="actions w-25">
//                       <div className="d-flex justify-content-center flex-row gap-4">
//                         <button
//                           onClick={() => confirmDeleteOrder(order.Id)}
//                           className="btn btn-sm btn-danger"
//                         >
//                           Delete
//                         </button>
//                         <button
//                           onClick={() => {
//                             const updatedOrder = { ...order };
//                             updatedOrder.Product = prompt(
//                               "Enter new product name",
//                               updatedOrder.Product
//                             );
//                             updatedOrder.Price = prompt(
//                               "Enter new price",
//                               updatedOrder.Price
//                             );
//                             updatedOrder.Quantity = prompt(
//                               "Enter new quantity",
//                               updatedOrder.Quantity
//                             );

//                             if (
//                               updatedOrder.Product &&
//                               updatedOrder.Price &&
//                               updatedOrder.Quantity
//                             ) {
//                               editOrder(order.id, updatedOrder);
//                             }
//                           }}
//                           className="btn btn-sm btn-primary"
//                         >
//                           Edit
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="5">No orders? Please add an order.</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//           <div className="my-3 justify-content-between d-flex">
//             <div>
//               <Link to="/users/order/addproduct">
//                 <button className="bg_btn btn btn-success">Add Product</button>
//               </Link>
//             </div>
//             <div>
//               <button className="bg_btn btn btn-success">Place Order</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

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
