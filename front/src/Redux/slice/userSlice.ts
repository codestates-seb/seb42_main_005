import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  user?: any;
  userIdx?: number | undefined;
  storeIdx?: number | undefined;
  userType?: string;
  isLogin?: boolean;
}
//백엔드한테 어떻게 던져주는지 알아보고 수정
const initialState: User = {
  user: {},
  userIdx: undefined,
  storeIdx: undefined,
  userType: "",
  isLogin: false,
};

export const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    //로그인 됐을때, type
    getUserType(state, action: PayloadAction<User>) {
      state.userType = action.payload.userType;
      state.isLogin = true;
    },
    //로그인 됐을때, idx
    getUserIdx(state, action: PayloadAction<User>) {
      state.userIdx = action.payload.userIdx;
      state.storeIdx = action.payload.storeIdx;
      state.isLogin = true;
    },
    //로그인 됐을때 유저인포
    loginUser(state, action: PayloadAction<User>) {
      state.isLogin = true;
      state.user = action.payload;
    },
    //로그인아웃
    logOut(state) {
      state.isLogin = false;
      state.userIdx = undefined;
      state.user = {};
    },
  },
});

export const { getUserType, getUserIdx, loginUser, logOut } = userSlice.actions;
export default userSlice.reducer;
