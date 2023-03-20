import { getMyReviews } from "./../slice/getMyReviewSlice";
import getLikedPharmListSlice from "./../slice/getLikedPharmListSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import getPharmSlice from "../slice/getPharmSlice";
import getPharmListSlice from "../slice/getPharmListSlice";
import getReviewSlice from "../slice/getReviewSlice";
import getMyReviewSlice from "../slice/getMyReviewSlice";

const rootReducer = combineReducers({
  getPharmDetail: getPharmSlice,
  getPharmListDetail: getPharmListSlice,
  getReview: getReviewSlice,
  getLikedPharmList: getLikedPharmListSlice,
  getMyReviews: getMyReviewSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
