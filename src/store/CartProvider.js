import React, { useState, useContext } from "react";
import CartContext from "./cart-context";

const CartProvider = (props) => {
  const cartCtx = useContext(CartContext);
  const [cartItems, setCartItems] = useState([]);

  const addItemToCartHandler = (item) => {
    // Check if the item already exists in the cart
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === item.id && cartItem.size === item.size
    );

    if (existingItemIndex !== -1) {
      // If it exists, update the quantity
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += item.quantity;
      setCartItems(updatedCartItems);
    } else {
      // If it doesn't exist, add it to the cart
      setCartItems((prevCartItems) => [...prevCartItems, item]);
    }
  };

  const removeItemFromCartHandler = (itemId, itemSize) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) => !(item.id === itemId && item.size === itemSize)
      )
    );
  };

  const updateAvailableSizesHandler = (updatedSizes) => {
    // Convert the updatedSizes object into an array of key-value pairs
    const updatedSizesArray = Object.entries(updatedSizes);
  
    // Assuming you have availableSizes in your cart context state
    const updatedAvailableSizes = { ...cartCtx.availableSizes };
  
    for (const [size, quantity] of updatedSizesArray) {
      // Ensure the size exists in availableSizes
      if (updatedAvailableSizes[size] !== undefined && quantity > 0) {
        // Reduce the available quantity by the quantity in the cart
        updatedAvailableSizes[size] -= quantity;
      }
    }
  
    // Update the available sizes in your cart context
    cartCtx.updateAvailableSizes(updatedAvailableSizes);
  };
  

  const clearCartHandler = () => {
    setCartItems([]);
  };

  const cartContext = {
    items: cartItems,
    totalAmount: cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    ),
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    updateAvailableSizes: updateAvailableSizesHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
