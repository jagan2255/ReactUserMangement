import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./userReduser"

export const store = configureStore({
  reducer: {
    userData: usersReducer,
   
  },
});
