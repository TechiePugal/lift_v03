// treatmentSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { formatDate } from "../../utils/date";

const initialState = {
  startDate: formatDate(new Date()),
  // Add other treatment-related fields as needed
};

const treatmentSlice = createSlice({
  name: "treatment",
  initialState,
  reducers: {
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    // Add other treatment-related actions as needed
  },
});

export const { setStartDate } = treatmentSlice.actions;

export default treatmentSlice.reducer;
