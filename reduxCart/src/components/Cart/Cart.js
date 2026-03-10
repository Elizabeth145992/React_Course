import { useSelector } from "react-redux";

import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartItems.map((itemP) => (
          <CartItem
            key={itemP.id}
            item={{
              id: itemP.id,
              title: itemP.name,
              quantity: itemP.quantity,
              total: itemP.totalPrice,
              price: itemP.price,
            }}
          />
        ))}
      </ul>
    </Card>
  );
};

export default Cart;
