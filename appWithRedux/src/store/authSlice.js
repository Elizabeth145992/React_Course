import { createSlice } from "@reduxjs/toolkit";

const initialStateAuth = {
    isAuthenticated: false,
}
const authSlice = createSlice({
    name: 'authentication',
    initialState: initialStateAuth,
    reducers: {
        login(state){
            state.isAuthenticated = true;
        },
        logout(state){
            state.isAuthenticated = false;
        }
    }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;