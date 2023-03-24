import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  address?: string;
  name?: string;
  storeIdx?: number | null;
  userIdx?: number | null;
  userRole?: string;
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
  },
});
export const { getUserInfo } = userSlice.actions;
export default userSlice.reducer;
