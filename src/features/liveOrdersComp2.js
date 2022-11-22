import { createSlice } from "@reduxjs/toolkit";

export const initialStateValue = [0];

export const liveOrders = createSlice({
  name: "liveOrders",
  initialState: { value: initialStateValue },
  reducers: {
    getData: (state, action) => {
      state.value = [action.payload, ...state.value.slice(0, 30)];
    },
  },
});

export const { getData } = liveOrders.actions;

export default liveOrders.reducer;
