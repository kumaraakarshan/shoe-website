import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import { useContext } from 'react';
import CartContext from '../../store/cart-context';

const HeaderCartButton = (props) => {
    const cartCtx = useContext(CartContext)
    let quantity =0
    cartCtx.items.forEach((item)=> {
        quantity = quantity + Number(item.quantity)
    })

    return (
       <button onClick={props.onShow} className={classes.button}>
        <span className={classes.icon}>
            <CartIcon/>
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{quantity}</span>
       </button>
    )
}

export default HeaderCartButton;