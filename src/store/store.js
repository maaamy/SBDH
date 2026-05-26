import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import customerReducer from "./slices/customerSlice";
import enterpriseReducer from "./slices/enterpriseSlice";
import appDataReducer from "./slices/appDataSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    enterprise: enterpriseReducer,
    appData: appDataReducer,
  },
});