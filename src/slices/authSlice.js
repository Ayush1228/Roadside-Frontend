import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // register:null,
    loading:false,
    token:localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    refreshToken:localStorage.getItem("refreshToken") ? JSON.parse(localStorage.getItem("refreshToken")) : null,
}

const authSlice = createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        // setRegister:(state, action) => {
        //     state.register = action.payload;
        // },
        setLoading:(state, action) => {
            state.loading = action.payload;
        },
        setToken:(state, action) => {
            state.token = action.payload;
        },
        setRefreshToken:(state, action) => {
            state.refreshToken = action.payload;
        }
    }
});

export const { setLoading, setToken, setRefreshToken} = authSlice.actions;
export default authSlice.reducer;
