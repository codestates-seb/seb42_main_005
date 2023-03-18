import { configureStore } from "@reduxjs/toolkit";
import getPharmSlice from "../slice/getPharmSlice";

export const store = configureStore({
  reducer: {
    getPharm: getPharmSlice,
  },
});
