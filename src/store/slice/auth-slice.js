import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  token: null,
  userId: null,
  displayName: null,
  companyId: null,
  role: null,
  isOpen: false,
  subscriptionInfo: "",
  treatment_qty: false,
};

export const authSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    userSettings: (state, action) => {
      state.loggedIn = true;
      state.token = action.payload?.token;
      localStorage.setItem("token", action.payload.token);
      state.userId = action.payload?._id;
      state.displayName = action.payload?.name;
      state.companyId = action.payload?.company_id;
      state.role = action.payload?.role1;
      state.email = action.payload?.emailId;
      state.phone = action.payload?.phoneNumber;
      state.subscriptionInfo = action.payload?.subscriptionInfo;
      state.treatment_qty = action.payload?.treatment_qty;
      state.customer_id = action.payload?.customer_id;
    },
    cleanupUserSettings: (state) => {
      state.loggedIn = false;
      localStorage.removeItem("token");
      state.token = null;
      state.userId = null;
      state.displayName = null;
      state.companyId = null;
      state.role = null;
      state.email = null;
      state.phone = null;
      state.subscriptionInfo = "";
      state.treatment_qty = false;
    },
    openProfileModal: (state) => {
      state.isOpen = true;
    },
    closeProfileModal: (state) => {
      state.isOpen = false;
    },
    updateTreatmentQtyState: (state, action) => {
      state.treatment_qty = action.payload;
    },
  },
});

export const {
  userSettings,
  cleanupUserSettings,
  openProfileModal,
  closeProfileModal,
  updateTreatmentQtyState
} = authSlice.actions;

export default authSlice.reducer;
