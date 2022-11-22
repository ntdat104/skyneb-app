import { createSlice } from "@reduxjs/toolkit";

export const initialStateValue = [0];

export const orderBook = createSlice({
  name: "orderBook",
  initialState: { value: initialStateValue },
  reducers: {
    getOrderBookData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { getOrderBookData } = orderBook.actions;

export default orderBook.reducer;
