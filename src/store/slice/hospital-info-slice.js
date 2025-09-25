// hospitalSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isdeleted: false,
  _id: '',
  company: '',
  address: '',
  phoneNumber1: '',
  createdAt: '',
  updatedAt: '',
  __v: 0,
  whatsapp: '',
  upcomingReminder: false,
  upcomingReminderTime: '',
  followUpReminder: false,
  followUpReminderTime: '',
  addressLine1: '',
  addressLine2: '',
  addressLine3: '',
  addressLine4: '',
  logoUrl: '',
  signUrl: '',
  upcomingReminderLastSuccessfulOperationDate: '',
  followUpReminderLastSuccessfulOperationDate: '',
  conversationReminingCount: 0,
  doctorAppointmentsWhatsapp: false,
  doctorAppointmentsWhatsappTime: '',
  doctorAppointmentsWhatsappLastSuccessfulOperationDate: '',
  reviewLink: '',
  SI_NO: 0,
  messageRemainingCount: 0,
  patientId_prefix: '',
  birthdayWish:false,
  financeAbstract:false,
  labOrderArrivalUpdate:false
 
};

const hospitalSlice = createSlice({
  name: 'hospital',
  initialState,
  reducers: {
    setHospitalData: (state, action) => {
      console.log(initialState,"initialState from reducer")
      console.log(state,"State from reducer")
      
      return { ...state, ...action.payload };
    },
    clearHospitalData: (state) => {
      return initialState;
    },
    updateShowBalanceState: (state, action) => {
      state.showPendingBalance = action.payload;
    },
    updateSendBirthdayWishState: (state, action) => {
      state.birthdayWish = action.payload;
    },
    updateShowFinanceAbstractState: (state, action) => {
      state.birthdayWish = action.payload;
    },
    updateLabOrderToPatientState: (state, action) => {
      state.birthdayWish = action.payload;
    },
  },
});

export const { setHospitalData, clearHospitalData,updateShowBalanceState,updateSendBirthdayWishState,updateShowFinanceAbstractState,updateLabOrderToPatientState } = hospitalSlice.actions;

export default hospitalSlice.reducer;
