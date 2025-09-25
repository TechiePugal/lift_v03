// labsSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { formatDate } from "../../utils/date";
import { endOfMonth, startOfMonth } from "date-fns";

// startDate = startOfMonth(new Date());
// endDate = endOfMonth(new Date());
const initialState = {
  startDate: startOfMonth(new Date())?.toString(),
  endDate: endOfMonth(new Date())?.toString(),
  status: "",
  selectedLab: "",
  // Add other lab-related fields as needed
};

const labsSlice = createSlice({
  name: "labs",
  initialState,
  reducers: {
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setSelectedLab: (state, action) => {
      state.selectedLab = action.payload;
    },
    // Add other lab-related actions as needed
  },
});

export const { setStartDate, setEndDate, setStatus, setSelectedLab } =
  labsSlice.actions;

export default labsSlice.reducer;
