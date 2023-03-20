import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const getPharmListSlice: any = createSlice({
  name: "getPharmListDetail",
  initialState: {
    response: {
      storeHome: [],
    },
  },
  reducers: {
    getPharmListAction: (state: any, action: PayloadAction<any>) => {
      state.response = action.payload;
    },
  },
});

export const { getPharmListAction } = getPharmListSlice.actions;
export const getPharmList = (state: any) => state.getPharmDetail.response;
export default getPharmListSlice.reducer;