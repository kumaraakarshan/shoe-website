import React from "react";
import classes from "./ShoeItem.module.css";
import ShoeItemForm from "./ShoeItemForm";

const ShoeItem = (props) => {
  const price = `Rs. ${props.price.toFixed(2)}`;
  const { name, description, sizes } = props;

  // Add a conditional check for sizes
  if (!sizes) {
    return null; // or some fallback UI if sizes is not defined
  }

  return (
    <li className={classes.Shoe}>
      <div>
        <h3>{name}</h3>
        <div className={classes.description}>{description}</div>
        <div className={classes.price}>{price}</div>
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
        <ShoeItemForm id={props.id} item={props} sizes={props.sizes} />
      </div>
    </li>
  );
};

export default ShoeItem;
