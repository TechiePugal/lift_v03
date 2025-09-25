// customerSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { formatDate } from '../../utils/date';

const initialState = {
  startDate: formatDate(new Date()),
  // Add other customer-related fields as needed
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    // Add other customer-related actions as needed
  },
});

export const { setStartDate } = customerSlice.actions;

export default customerSlice.reducer;
