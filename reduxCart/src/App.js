import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { uiActions } from "./store/uiSlice";
import Notification from './components/UI/Notification';

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartVisible);
  const cart = useSelector((state) => state.cart);
  const showNotification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data",
      }),
    );

    const sendCart = async () => {
      const response = await fetch(
        "https://curso-react-dedc5-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        },
      );

      if (!response.ok) {
        throw new Error("Error to sending cart data to Data base");
        
      }

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Sent!",
          message: "Sent cart data",
        }),
      );
    };

    sendCart().catch(error => {
      dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error...",
            message: "Error to send cart data",
          }),
        );
    });
  }, [cart, dispatch]);

  return (
    <>
    {showNotification && <Notification status={showCart.status} title={showCart.title} message={showCart.message}  />}
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
   </> 
  );
}

export default App;
