import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    register:null,
    loading:false,
    token:localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
}

const authSlice = createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        setRegister:(state, action) => {
            state.register = action.payload;
        },
        setLoading:(state, action) => {
            state.loading = action.payload;
        },
        setToken:(state, action) => {
            state.token = action.payload;
        }
    }
});

export const {setGarageRegister, setLoading, setToken} = authSlice.actions;
export default authSlice.reducer;
