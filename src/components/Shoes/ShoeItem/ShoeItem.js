// ShoeItem.js
import React, { useEffect } from "react";
import classes from "./ShoeItem.module.css";
import ShoeItemForm from "./ShoeItemForm";

const ShoeItem = (props) => {
  const { id, name, description, price, sizes = {}, updateSizes } = props;

  useEffect(() => {
    // Ensure sizes is initialized as an empty object if not provided
    const newSizes = { ...sizes };
    
    if (newSizes.small > 0) {
      newSizes.small -= 1; // Reduce the quantity of the "small" size by 1
      updateSizes(id, newSizes);
    }
  }, [id, sizes, updateSizes]);

  const formattedPrice = `Rs. ${price.toFixed(2)}`;

  return (
    <li className={classes.Shoe}>
      <div>
        <h3>{name}</h3>
        <div className={classes.description}>{description}</div>
        <div className={classes.price}>{formattedPrice}</div>
        <div className={classes.sizes}>
          <h4>Available Sizes:</h4>
          <ul>
            {Object.entries(sizes).map(([size, quantity]) => (
              <li key={size}>
                {size}: {quantity}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <ShoeItemForm id={id} item={props} sizes={sizes} />
      </div>
    </li>
  );
};

export default ShoeItem;
