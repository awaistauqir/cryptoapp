import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currency: "USD",
  symbol: "$",
};

export const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrency: (state, action) => {
      state.currency = action.payload.currency;
      state.symbol = action.payload.symbol;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrency } = currencySlice.actions;

export default currencySlice.reducer;
