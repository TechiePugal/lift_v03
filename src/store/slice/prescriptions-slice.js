// prescriptionSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { formatDate } from '../../utils/date';

const initialState = {
  startDate: formatDate(new Date()),
  // Add other prescription-related fields as needed
};

const prescriptionSlice = createSlice({
  name: 'prescription',
  initialState,
  reducers: {
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    // Add other prescription-related actions as needed
  },
});

export const { setStartDate } = prescriptionSlice.actions;

export default prescriptionSlice.reducer;
