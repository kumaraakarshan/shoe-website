import React,{ useState} from 'react'
import Cart from './components/Cart/Cart';
import Header from "./components/Layout/Header";
import Shoes from './components/Shoes/Shoes';
import CartProvider from './store/CartProvider';


function App() {
  const [cart,setCart]=useState(false)

  const cartOpenHandler =() => {
    setCart(true)
  }
  const cartCloseHandler =() => {
    setCart(false)
  }
  return (
    <CartProvider>
      {cart &&<Cart onClose={cartCloseHandler}/>}
    <Header onShow={cartOpenHandler}/>
    <main>
    <Shoes/>
    </main>
    </CartProvider>
  );
}

export default App;