import { useContext, useActionState } from "react";
import Modal from "./UI/Modal";
import Input from "./UI/Input";
import Button from "./UI/Button";
import ErrorMessage from "./ErrorMessage";
import CartContext from "../context/cartContext";
import UserProgressContext from "../context/UserProgressContext";
import { currencyFormatter } from "../util/formatting";
import useRequestApi from "../hooks/useRequestApi";

const URL = "http://localhost:3000/orders";
const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const cartctx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartctx.items.reduce((totalPrice, item) => {
    return totalPrice + item.price * item.quantity;
  }, 0);

  const { data, error, sendRequest, clearData } = useRequestApi(
    URL,
    requestConfig,
  );

  function handlerCloseModal() {
    userProgressCtx.hideCheckout();
  }

  function handleFinish(){
    userProgressCtx.hideCheckout();
    cartctx.clearCart();
    clearData();
  }

  async function checkoutAction(prevState, formData) {
    const customerData = Object.fromEntries(formData.entries());

    await sendRequest(
      JSON.stringify({
        order: {
          items: cartctx.items,
          customer: customerData,
        },
      }),
    );
  }

  const [formState, formAction, sending] = useActionState(checkoutAction, null)

  let actions = (
    <>
      <Button type="button" textOnly onClick={handlerCloseModal}>
        Close
      </Button>
      <Button>Submit order</Button>
    </>
  );

  if (sending) {
    actions = <span>Sending order...</span>;
  }

  if(data && !error){
    return (
      <Modal  
        open={userProgressCtx.progress == "checkout"}
        onClose={handleFinish}
      >
        <h2>Success!!</h2>
        <p>Your order was submit successfully.</p>
        <p>We send details of your order by email</p>
        <p className="modal-options">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    )
  }

  return (
    <Modal
      className="cart"
      open={userProgressCtx.progress == "checkout"}
      onClose={handlerCloseModal}
    >
      <form action={formAction}>
        <h2>Checkout</h2>
        <p>Total amount: {currencyFormatter.format(cartTotal)}</p>

        <Input label="Full Name" type="text" id="name" />
        <Input label="Email address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Potal code" text="text" id="postal-code" />
          <Input label="City" text="text" id="city" />
        </div>
        {error && <ErrorMessage title="Failed to submit order" message={error.message} />}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
