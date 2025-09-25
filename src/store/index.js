import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/auth-slice";
import appointmentReducer from "./slice/appointment-slice";
import treatmentReducer from "./slice/treatment-slice";
import prescriptionReducer from "./slice/prescriptions-slice";
import labsReducer from "./slice/labs-slice";
import paymentReducer from "./slice/payment-slice";
import expenseReducer from "./slice/expense";
import hospitalInfoReducer from "./slice/hospital-info-slice";
import configSettingReducer from "./slice/config-settings-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    appointment: appointmentReducer,
    treatment: treatmentReducer,
    prescription: prescriptionReducer,
    labs: labsReducer, // Include the labs reducer
    payment: paymentReducer,
    expense: expenseReducer,
    hospitalInfo: hospitalInfoReducer,
    configSettings: configSettingReducer,
  },
});

export default store;
