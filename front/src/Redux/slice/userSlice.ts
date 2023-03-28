import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../Api/TYPES";

const initialState: User = {
  address: "",
  name: "",
  storeIdx: null,
  userIdx: null,
  userType: "",
  userRole: "",
};

export const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    get: (state, action) => {
      state.response = action.payload;
    },

    DeleteUserInfo: (state) => {
      state.response = null;
    },
  },
});
export const { get, DeleteUserInfo } = userSlice.actions;
export default userSlice.reducer;
