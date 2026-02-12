import { useContext } from "react";
import Modal from "./UI/Modal";
import Button from "./UI/Button";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import CartContext from "../context/cartContext";
import { currencyFormatter } from "../util/formatting";
import UserProgressContext from "../context/UserProgressContext";

export default function Cart() {
  const cartctx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  function hideCartHandler() {
    userProgressCtx.hideCart();
  }

  function showCheckoutHandler() {
    userProgressCtx.showCheckout();
  }

  const cartTotal = cartctx.items.reduce((totalPrice, item) => {
    return totalPrice + item.price * item.quantity;
  }, 0);

  return (
    <Modal
      className="cart"
      open={userProgressCtx.progress === "cart"}
      onClose={userProgressCtx.progress === "cart" ? hideCartHandler : null}
    >
      <h2>Cart</h2>
      <ul>
        {cartctx.items.map((item, index) => (
          <CartItem
            key={index}
            name={item.name}
            qty={item.quantity}
            price={item.price}
            onDecrease={() => cartctx.removeItem(item.id)}
            onIncrease={() => cartctx.addItem(item)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={hideCartHandler}>
          Close
        </Button>
        {cartctx.items.length > 0 && (
          <Button onClick={showCheckoutHandler}>Go to checkout</Button>
        )}
      </p>
    </Modal>
  );
}
