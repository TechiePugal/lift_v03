// prescriptionSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { formatDate } from '../../utils/date';

const initialState = {
  startDate: formatDate(new Date()),
  // Add other prescription-related fields as needed
};

const configSettingsSlice = createSlice({
  name: 'configSettings',
  initialState,
  reducers: {
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    // Add other prescription-related actions as needed
  },
});

export const { setStartDate } = configSettingsSlice.actions;

export default configSettingsSlice.reducer;
