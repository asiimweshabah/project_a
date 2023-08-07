import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export default function AddProduct({ onClose }) {
  const [formData, setFormData] = useState({
    product: "",
    price: "",
    quantity: "",
    amount: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "price" || name === "quantity") {
      const price = name === "price" ? value : formData.price;
      const quantity = name === "quantity" ? value : formData.quantity;
      const amount = calculateAmount(price, quantity);

      setFormData({ ...formData, [name]: value, amount });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const calculateAmount = (price, quantity) => {
    if (price && quantity) {
      return price * quantity;
    }
    return "";
  };

  async function submit(event) {
    try {
      const token = localStorage.getItem("token");
      event.preventDefault();
      const { product, price, quantity, amount } = formData;
      await axios.post(
        "http://localhost:3006/products/createProduct",
        {
          product,
          price,
          quantity,
          amount,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      onClose();
      toast.success("Product added successfully!", {
        position: "top-center",
        autoClose: 2000,
      });
    } catch (error) {
      console.error(error);
    }
  }

  const handleCancel = () => {
    onClose();
  };

  return (
    <form className="form w-100 px-5" onSubmit={submit} action="">
      <div className="col-12 m-2">
        <label>Product</label>
        <input
          value={formData.product}
          onChange={handleInputChange}
          className="form-control w-100"
          type="text"
          name="product"
        />
      </div>
      <div className="col-12 m-2">
        <label>Price</label>
        <input
          value={formData.price}
          onChange={handleInputChange}
          className="form-control w-100"
          type="text"
          name="price"
        />
      </div>
      <div className="col-12 m-2">
        <label>Quantity</label>
        <input
          value={formData.quantity}
          onChange={handleInputChange}
          className="form-control w-100"
          type="text"
          name="quantity"
        />
      </div>
      <div className="col-12 m-2">
        <label>Amount</label>
        <input
          value={formData.amount}
          onChange={handleInputChange}
          className="form-control w-100"
          type="text"
          name="amount"
        />
      </div>

      <div className="d-flex mx-2 mb-5 w-100 justify-content-between">
        <button onClick={handleCancel} className="btn btn-secondary">
          Cancel
        </button>

        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </div>
    </form>
  );
}
