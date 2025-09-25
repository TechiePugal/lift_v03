import { api } from "../../config/axios/interceptor";

// Messages Services
export async function sendPrescriptionMessage(payload) {
    try {
      const response = await api.post(`prescription/message`, payload);
      return response;
    } catch (error) {
      throw error;
    }
  }
  export async function sendInvoiceMessage(payload) {
    try {
      const response = await api.post(`invoice/message`, payload);
      return response;
    } catch (error) {
      throw error;
    }
  }
  export async function sendNextappointmentMessage(payload) {
    try {
      const response = await api.post(
        `/appointment/nextappointmentMessage`,
        payload
      );
      return response;
    } catch (error) {
      throw error;
    }
  }