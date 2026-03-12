import { createSlice } from '@reduxjs/toolkit';

const uiInitialState = {
    cartVisible: false,
    notification: null,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState: uiInitialState,
    reducers: {
        toggle(state){
            state.cartVisible = !state.cartVisible
        },
        showNotification(state, action){
            const notification = action.payload;
            state.notification = { 
                status: notification.status,
                title: notification.title,
                message: notification.message,
            }
        }
    }
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;