import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../slice/userSlice";

const rootReducer = combineReducers({
  userInfo: userSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
