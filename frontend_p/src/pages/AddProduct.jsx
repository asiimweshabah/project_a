import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function AddProduct() {
  const navigate = useNavigate();
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
      event.preventDefault();
      const { product, price, quantity, amount } = formData;
      const response = await axios.post("http://localhost:3006/orders/create", {
        product,
        price,
        quantity,
        amount,
      });
      if (response) {
        navigate("/order");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="container top">
      <form onSubmit={submit} action="">
        <div className="container mt-5 row d-flex justify-content-center">
          <div className="row col-md-6 col-sm-12 col-xs-12">
            <div className="m-2">
              <label>
                Product <span className="text-danger">*</span>
              </label>
              <input
                value={formData.product}
                onChange={handleInputChange}
                className="form-control"
                type="text"
                name="product"
                required
              />
            </div>
            <div className="col-12 m-2">
              <label>Price</label>
              <input
                value={formData.price}
                onChange={handleInputChange}
                className="form-control"
                type="text"
                name="price"
              />
            </div>

            <div className="col-12 d-flex">
              <div className="d-flex flex-row m-2  w-100 justify-content-between">
                <Link to="/order">
                  <button className="btn btn-secondary">Cancel</button>
                </Link>
                <button type="submit" className="btn btn-primary">
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
