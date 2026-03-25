import { uiActions } from "./uiSlice";
import { cartActions } from "./cartSlice";

//Action creator Thunk
export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data",
      }),
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://curso-react-dedc5-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        },
      );

      if (!response.ok) {
        console.log(response);
        throw new Error("Error to sending cart data to Data base");
      }
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Sent!",
          message: "Sent cart data",
        }),
      );
    } catch (error) {
        dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error...",
          message: "Error to send cart data: " + error.message,
        }),
      );
    }
  };
};

export const cartData = () => {
    return async (dispatch) => {
        const fetchDataCart = async () => {
            const response = await fetch('https://curso-react-dedc5-default-rtdb.firebaseio.com/cart.json');

            if(!response.ok){
                throw new Error("Error to get Data from cart");
                
            }
            return await response.json();
        }

        try {
            const dataCart = await fetchDataCart();
            dispatch(cartActions.replaceCart({
              items: dataCart.items || [],
              totalQuantity: dataCart.totalQuantity || 0,
            }));
        } catch (error) {
            dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error...",
          message: "Error to get cart data " + error.message,
        }),
      );
        }
    }
}