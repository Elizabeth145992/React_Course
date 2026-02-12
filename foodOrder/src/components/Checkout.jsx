import { useContext } from "react";
import Modal from "./UI/Modal";
import Input from "./UI/Input";
import Button from "./UI/Button";
import CartContext from "../context/cartContext";
import UserProgressContext from "../context/UserProgressContext";
import { currencyFormatter } from "../util/formatting";

export default function Checkout() {
  const cartctx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartctx.items.reduce((totalPrice, item) => {
    return totalPrice + item.price * item.quantity;
  }, 0);

  function handlerCloseModal() {
    userProgressCtx.hideCheckout();
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const customerData = Object.fromEntries(formData.entries());

    const response = await fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order: {
          items: cartctx.items,
          customer: customerData,
        },
      }),
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));

    console.log(response);
  }

  return (
    <Modal
      className="cart"
      open={userProgressCtx.progress == "checkout"}
      onClose={handlerCloseModal}
    >
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total amount: {currencyFormatter.format(cartTotal)}</p>

        <Input label="Full Name" type="text" id="name" />
        <Input label="Email address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Potal code" text="text" id="postal-code" />
          <Input label="City" text="text" id="city" />
        </div>
        <p className="modal-actions">
          <Button type="button" textOnly onClick={handlerCloseModal}>
            Close
          </Button>
          <Button>Submit order</Button>
        </p>
      </form>
    </Modal>
  );
}
