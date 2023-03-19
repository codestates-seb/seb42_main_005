import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getPharmListSlice: any = createSlice({
  name: "getPharmListDetail",
  initialState: {
    response: {
      storeHome: [],
    },
  },
  reducers: {
    getPharmListD: (state: any, action: PayloadAction<any>) => {
      state.response = action.payload;
    },
  },
});
const { getPharmListD } = getPharmListSlice.actions;
export const getPharmDListActions = getPharmListSlice.actions;
export const getPharmList = (state: any) => state.getPharmDetail.response;
export default getPharmListSlice.reducer;
