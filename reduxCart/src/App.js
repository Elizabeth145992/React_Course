import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { sendCartData, cartData } from "./store/cart-actions";

let isInitial = true;
function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartVisible);
  const cart = useSelector((state) => state.cart);
  const showNotification = useSelector((state) => state.ui.notification);
  
  useEffect(() => {
    dispatch(cartData());
  }, [dispatch])

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if(cart.changed){
      dispatch(sendCartData(cart));
    }
    
  }, [cart, dispatch]);

  return (
    <>
      {showNotification && (
        <Notification
          status={showNotification.status}
          title={showNotification.title}
          message={showNotification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
