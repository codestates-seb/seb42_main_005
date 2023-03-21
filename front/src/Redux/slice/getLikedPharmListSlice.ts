import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const getLikedPharmListSlice: any = createSlice({
  name: "getLikedPharmList",
  initialState: {
    response: {
      stores: [],
    },
  },
  reducers: {
    getLikedPharmListAction: (state: any, action: PayloadAction<any>) => {
      state.response = action.payload;
    },
  },
});
export const { getLikedPharmListAction } = getLikedPharmListSlice.actions;
export const getLikedPharmList = (state: any) => state.getLikedPharmList.response;
export default getLikedPharmListSlice.reducer;
