import { useContext } from "react";
import Modal from "./Modal";
import CartContext from "../../context/cartContext";
import { currencyFormatter } from "../../util/formatting";
import Button from "./Button";

export default function Cart(){
    const cartctx = useContext(CartContext);
    
    const cartTotal = cartctx.items.reduce((totalPrice, item) => {
        return totalPrice + item.price * item.quantity;
    }, 0);

    return (
        <Modal className="cart">
            <h2>Cart</h2>
            <ul>
                {cartctx.items.map(item => 
                    <li key={item.id}>{item.name} - ${item.price * item.quantity}</li>
                )}
            </ul>
            <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
            <p className="modal-actions">
                <Button textOnly>Close</Button>
                <Button>Go to checkout</Button>
            </p>
        </Modal>
    )
}