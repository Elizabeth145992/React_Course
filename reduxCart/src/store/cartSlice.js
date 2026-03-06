import { createSlice } from "@reduxjs/toolkit";

const cartInitialState = {
    items: [],
    totalQuantity: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: cartInitialState,
    reducers: {
        addItem(state, action){},
        removeItem(state, action){}
    }
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;