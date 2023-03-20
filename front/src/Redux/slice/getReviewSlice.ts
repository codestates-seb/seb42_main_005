import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const getReviewSlice: any = createSlice({
  name: "getReview",
  initialState: {
    storeReview: [],
  },
  reducers: {
    getReviewListAction: (state: any, action: PayloadAction<any>) => {
      state.storeReview = action.payload;
    },
  },
});
export const { getReviewListAction } = getReviewSlice.actions;
export const getReview = (state: any) => state.getPharmDetail.storeReview;
export default getReviewSlice.reducer;