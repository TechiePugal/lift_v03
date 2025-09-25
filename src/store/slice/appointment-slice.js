// appointmentsSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { formatDate } from "../../utils/date";

const initialState = {
  dateStart: formatDate(new Date()),
  dateEnd: formatDate(new Date()),
  doctor: "",
  status: "",
};

const appointmentsSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    setDateStart: (state, action) => {
      state.dateStart = action.payload;
    },
    setDateEnd: (state, action) => {
      state.dateEnd = action.payload;
    },
    setDoctor: (state, action) => {
      state.doctor = action.payload;
    },
    setSelectStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setDateStart, setDateEnd, setDoctor, setSelectStatus } =
  appointmentsSlice.actions;

export default appointmentsSlice.reducer;
