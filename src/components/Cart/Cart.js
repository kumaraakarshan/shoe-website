import React, { useContext } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const increaseQuantityHandler = (item) => {
    cartCtx.addItem({ ...item, quantity: 1 });
  };

  const decreaseQuantityHandler = (item) => {
    cartCtx.removeItem(item.id, item.size);
  };

  const placeOrderHandler = () => {
    // Create a copy of the available sizes object from the cart context
    const updatedAvailableSizes = { ...cartCtx.availableSizes };
  
    // Loop through the items in the cart
    cartCtx.items.forEach((item) => {
      const { size, quantity } = item;
  
      // Ensure the size exists in availableSizes and the quantity is valid
      if (updatedAvailableSizes[size] !== undefined && quantity > 0) {
        // Reduce the available quantity by the quantity in the cart
        updatedAvailableSizes[size] -= quantity;
      }
    });
  
    // Update the available sizes in your cart context
    cartCtx.updateAvailableSizes(updatedAvailableSizes);
  
    // Clear the cart
    cartCtx.clearCart();
  
    // Show an alert for the successful order
    alert("Order placed successfully!");
  };
  

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <li key={`${item.id}-${item.size}`}>
          <div>
            <h3>{item.name}</h3>
            <span>Size: {item.size}</span>
            <span>Quantity: {item.quantity}</span>
            <div className={classes.price}>Rs.{item.price.toFixed(2)}</div>
          </div>

          <div className={classes.alter}>
            <button
              className={classes.decrease}
              onClick={() => decreaseQuantityHandler(item)}
            >
              -
            </button>
            <button
              className={classes.increase}
              onClick={() => increaseQuantityHandler(item)}
            >
              +
            </button>
          </div>
        </li>
      ))}
    </ul>
  );

  let amount = 0;
  cartCtx.items.forEach((item) => {
    amount = amount + Number(item.price * item.quantity);
  });

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>Rs.{amount.toFixed(2)}</span>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onClose} className={classes["button--alt"]}>
          Close
        </button>
        <button className={classes.button} onClick={placeOrderHandler}>
          Order
        </button>
      </div>
    </Modal>
  );
};

export default Cart;
