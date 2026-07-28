import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import customerReducer from "./slices/customerSlice";
import enterpriseReducer from "./slices/enterpriseSlice";
import appDataReducer from "./slices/appDataSlice";
import customerDashboardReducer from "./slices/customerDashboardSlice";
import enterpriseDashboardReducer from "./slices/enterpriseDashboardSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    enterprise: enterpriseReducer,
    appData: appDataReducer,
    customerDashboard: customerDashboardReducer,
    enterpriseDashboard: enterpriseDashboardReducer
  },
});