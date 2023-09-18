import React, { useContext, useState } from "react";
import Input from "../../UI/Input";
import classes from "./ShoeItemForm.module.css";
import CartContext from "../../../store/cart-context";

const ShoeItemForm = (props) => {
  const cartCtx = useContext(CartContext);
  const [selectedSize, setSelectedSize] = useState("S"); // Default size

  const sizeChangeHandler = (event) => {
    setSelectedSize(event.target.value);
  };

  const addItemToCart = (e) => {
    e.preventDefault();
    const quantity = document.getElementById(`amount_${props.id}`).value;
    cartCtx.addItem({ ...props.item, quantity: quantity, size: selectedSize });
  };

  return (
    <form className={classes.form}>
      <div>
        <label htmlFor={`size_${props.id}`}>Select Size:</label>
        <select
          id={`size_${props.id}`}
          value={selectedSize}
          onChange={sizeChangeHandler}
        >
          {Object.keys(props.sizes).map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Input
          label="Amount"
          input={{
            id: `amount_${props.id}`,
            type: "number",
            max: "5",
            min: "1",
            defaultValue: "1",
          }}
        />
      </div>
      <button onClick={addItemToCart}>+ Add</button>
    </form>
  );
};

export default ShoeItemForm;
