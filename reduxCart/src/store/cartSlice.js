import { createSlice } from "@reduxjs/toolkit";

const cartInitialState = {
  items: [],
  totalQuantity: 0,
  changed: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialState,
  reducers: {
    replaceCart(state, action) {
        state.totalQuantity = action.payload.totalQuantity;
        state.items = action.payload.items;
    },
    addItem(state, action) {
      const newItem = action.payload;
      const existItem = state.items.find((item) => item.id === newItem.id);
      state.changed = true;

      if (!existItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existItem.quantity++;
        existItem.totalPrice += newItem.price;
      }
      state.totalQuantity++;
    },
    removeItem(state, action) {
      const id = action.payload;
      const existItem = state.items.find((item) => item.id === id);
      if (!existItem) {
        return;
      }

      if (existItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existItem.quantity--;
        existItem.totalPrice -= existItem.price;
      }
      state.totalQuantity--;
      state.changed = true;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
