import { createSlice } from "@reduxjs/toolkit";

export const initialStateValue = [0];

export const liveTrades = createSlice({
  name: "liveTrades",
  initialState: { value: initialStateValue },
  reducers: {
    getTradesData: (state, action) => {
      state.value = [action.payload, ...state.value];
    },
  },
});

export const { getTradesData } = liveTrades.actions;

export default liveTrades.reducer;
