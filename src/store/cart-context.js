import React, { createContext} from "react";

const CartContext = createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (itemId, itemSize) => {},
  updateAvailableSizes: (updatedSizes) => {}, // Ensure this function exists
  clearCart: () => {},
  availableSizes: {}, // Ensure this object exists
});

export default CartContext;
