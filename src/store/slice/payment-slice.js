// paymentSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { formatDate } from "../../utils/date";

const initialState = {
  startDate: formatDate(new Date()),
  endDate: formatDate(new Date()),
  status: "",
};

const paymentSlice = createSlice({
  name: "payment",
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
    resetPayment: (state) => {
      return initialState;
    },
  },
});

export const { setStartDate, setEndDate, setStatus, resetPayment } =
  paymentSlice.actions;

export default paymentSlice.reducer;
