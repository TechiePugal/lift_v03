// expenseSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { formatDate } from "../../utils/date";
import { endOfMonth, startOfMonth } from "date-fns";

const initialState = {
  startDate: startOfMonth(new Date())?.toString(),
  endDate: endOfMonth(new Date())?.toString(),
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    // Action to set the starting date
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    // Action to set the ending date
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
  },
});

export const { setStartDate, setEndDate } = expenseSlice.actions;

export default expenseSlice.reducer;
