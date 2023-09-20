import { useState, useEffect } from "react";
import CartContext from "./cart-context";
import axios from "axios";

export const CartProvider = (props) => {
  // Initialize cart items state with an empty array
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch cart data from localStorage when the component mounts
    const storedCartData = localStorage.getItem("cartData");
    if (storedCartData) {
      setItems(JSON.parse(storedCartData));
    }
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const addItemToCartHandler = (item) => {
    let updatedItems = [...items];
    let flag = false;

    items.forEach((element, index) => {
      if (element.id === item.id) {
        updatedItems[index].quantity += Number(item.quantity);
        flag = true;

        // Update the item in the API
        const { _id, ...updatedData } = updatedItems[index];
        axios
          .put(`https://crudcrud.com/api/7c363e0f10c443dd9df3592c7dcdce77/cart/${_id}`, updatedData)
          .then((res) => {
            console.log(res.data, "Successfully updated item");
          })
          .catch((error) => {
            console.error("Error updating item:", error);
          });
      }
    });

    if (!flag) {
      // Add the item to the API
      axios
        .post("https://crudcrud.com/api/7c363e0f10c443dd9df3592c7dcdce77/cart", {
          ...item,
          quantity: 1,
        })
        .then((res) => {
          updatedItems.push(res.data);
          console.log(res.data, "Successfully added item");
          setItems(updatedItems);
          // Update localStorage with the new cart data
          localStorage.setItem("cartData", JSON.stringify(updatedItems));
        })
        .catch((error) => {
          console.error("Error adding item:", error);
        });
    }
  };

  const removeItemHandler = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);

    // Remove the item from the API
    axios.delete(`https://crudcrud.com/api/7c363e0f10c443dd9df3592c7dcdce77/cart/${id}`)
      .then((res) => {
        console.log(res.data, "Successfully removed item");
      })
      .catch((error) => {
        console.error("Error removing item:", error);
      });

    // Update localStorage with the new cart data
    localStorage.setItem("cartData", JSON.stringify(updatedItems));
  };

  const emptyCartHandler = () => {
    setItems([]);

    // Clear the cart in the API
    axios.delete("https://crudcrud.com/api/7c363e0f10c443dd9df3592c7dcdce77/cart")
      .then((res) => {
        console.log(res.data, "Successfully cleared cart");
      })
      .catch((error) => {
        console.error("Error clearing cart:", error);
      });

    // Clear localStorage
    localStorage.removeItem("cartData");
  };

  const initializeCartHandler = (items) => {
    setItems(items);

    // Update localStorage with the new cart data
    localStorage.setItem("cartData", JSON.stringify(items));
  };

  const cartContext = {
    items: items,
    totalAmount: 0, // You can calculate the total amount if needed
    addItem: addItemToCartHandler,
    removeItem: removeItemHandler,
    emptyCart: emptyCartHandler,
    initializeCart: initializeCartHandler,
   
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
