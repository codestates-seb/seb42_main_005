import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PharmList {
    storeHome : [
      storeIdx: number | undefined,
      name:string,
      address: string,
      longitude:number,
      latitude: number,
      tel:string,
      etc: string,
      rating:number,
      image:string,
      createdAt:string,
      modifiedAt:string,
      tags:string[],
    ]
  
}
const initialState : PharmList=   {
  storeHome : [
    storeIdx:undefined ,
    name:string,
    address: string,
    longitude:number,
    latitude: number,
    tel:string,
    etc: string,
    rating:number,
    image:string,
    createdAt:string,
    modifiedAt:string,
    tags:string[],
  ]
}
const getQuestionSlice = createSlice({
  name: "getPharmList",
  initialState: { response: {} },
  reducers: {
    get: (state, action: PayloadAction<PharmList>) => {
      state.response = action.payload;
    },
  },
});

export default getQuestionSlice;
