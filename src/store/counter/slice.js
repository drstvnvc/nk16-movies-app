import { createSlice } from "@reduxjs/toolkit";
import store from "..";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
    noviAttr: null,
  },
  reducers: {
    increment: (state) => {
      console.log("Counter reducer:: increment", { ...state });
      state.value++;
    },
    decrement: (state) => {
      console.log("Counter reducer:: decrement", { ...state });
      state.value--;
    },
    increaseByValue: (state, action) => {
      console.log("Counter reducer:: increaseByValue", { ...state }, action);
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, increaseByValue } = counterSlice.actions;
export default counterSlice.reducer;
