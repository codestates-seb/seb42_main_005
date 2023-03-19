import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// interface Pharm {
//   response: {
//     storeIdx: number | undefined;
//     name: string;
//     address: string;
//     longitude: number | undefined;
//     latitude: number | undefined;
//     tel: string;
//     etc: string;
//     rating: number | undefined;
//     image: string;
//     createdAt: string;
//     modifiedAt: string;
//   };
// }

// const initialState: Pharm = {
//   response: {
//     storeIdx: undefined,
//     name: "",
//     address: "",
//     longitude: undefined,
//     latitude: undefined,
//     tel: "",
//     etc: "",
//     rating: undefined,
//     image: "",
//     createdAt: "",
//     modifiedAt: "",
//   },
// };

// export const getPharm = createAsyncThunk("GET/PHARM", async () => {
//   try {
//     const response = await axios.get(" http://localhost:3001/response");
//     return response.data;
//   } catch (error) {
//     return console.log(error);
//   }
// });

const getPharmSlice: any = createSlice({
  name: "getPharmDetail",
  initialState: { response: {} },
  reducers: {
    getPharmD: (state: any, action: PayloadAction<string | number>) => {
      state.response = action.payload;
    },
  },
});
const { getPharmD } = getPharmSlice.actions;
export const getPharmDActions = getPharmSlice.actions;
export const getPharm = (state: any) => state.getPharmDetail.response;
export default getPharmSlice.reducer;
