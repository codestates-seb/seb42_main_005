import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  address?: string | null;
  name?: string | null;
  storeIdx?: number | null;
  userIdx?: number | null;
  userRole?: string | null;
}

const initialState: User = {
  address: "",
  name: "",
  storeIdx: null,
  userIdx: null,
  userRole: "",
};

export const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    getUserInfo: (state: any, action: PayloadAction<User>) => {
      state.response = action.payload;
    },

    DeleteUserInfo: (state: any) => {
      state.response = null;
    },
  },
});
export const { getUserInfo, DeleteUserInfo } = userSlice.actions;
export default userSlice.reducer;
