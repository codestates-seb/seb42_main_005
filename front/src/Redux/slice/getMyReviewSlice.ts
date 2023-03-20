import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const getMyReviewSlice: any = createSlice({
  name: "getMyReviews",
  initialState: {
    response: {
      reviews: [],
    },
  },
  reducers: {
    getMyReviewAction: (state: any, action: PayloadAction<any>) => {
      state.response = action.payload;
    },
  },
});
export const { getMyReviewAction } = getMyReviewSlice.actions;
export const getMyReviews = (state: any) => state.getMyReview.response;
export default getMyReviewSlice.reducer;
