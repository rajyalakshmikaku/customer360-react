import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./LoginSlice";
import dashboardReducer from "./dashboardSlice";
export const store = configureStore({
  reducer: {
    auth: loginReducer,
        dashboard: dashboardReducer,

  },
});
