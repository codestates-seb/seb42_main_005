import { combineReducers, configureStore } from "@reduxjs/toolkit";
import getReviewSlice from "../slice/getReviewSlice";

const rootReducer = combineReducers({
  getReview: getReviewSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
