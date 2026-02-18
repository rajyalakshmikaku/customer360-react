import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./LoginSlice";
import dashboardReducer from "./dashboardSlice";
import complaintsReducer from './complaintListSlice';
import UserReducer from "./UserListSlice"; 

export const store = configureStore({
  reducer: {
    auth: loginReducer,
        dashboard: dashboardReducer,
        complaints : complaintsReducer,
         User: UserReducer,
  },
});
