import { combineReducers, configureStore } from "@reduxjs/toolkit";
import getPharmSlice from "../slice/getPharmSlice";
import getPharmListSlice from "../slice/getPharmListSlice";
import getReviewSlice from "../slice/getReviewSlice";

const rootReducer = combineReducers({
  getPharmDetail: getPharmSlice,
  getPharmListDetail: getPharmListSlice,
  getReview: getReviewSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
