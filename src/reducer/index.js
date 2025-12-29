import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";

const rootReducer =  combineReducers({
    // Add your slice reducers here
    auth:authReducer,
});

export default rootReducer;
