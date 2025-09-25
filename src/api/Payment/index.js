import { api } from "../../config/axios/interceptor";

export async function getAllInvoice(
  searchKey,
  status,
  startDate,
  endDate,
  patient_id
) {
  try {
    const response = await api.get(
      // search=${searchKey || ""}&
      `invoice?status=${status || ""}&startDate=${startDate || ""}&endDate=${
        endDate || ""
      }&patient_id=${patient_id || ""}`
    );
    return response;
  } catch (error) {
    throw error;
  }
}
export async function getSingleInvoice(id) {
  try {
    const response = await api.get(`invoice/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function addInvoice(payload) {
  try {
    const response = await api.post(`invoice`, payload);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function getPendingInvoices(id) {
  try {
    const response = await api.get(`invoice/pending/` + id);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function getPaymentTransactionHistory(id) {
  try {
    const response = await api.get(`invoice/PaymentIns/` + id);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function updateInvoice(payload, id) {
  try {
    const response = await api.put(`invoice/` + id, payload);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function updatePaymentIn(payload, id) {
  try {
    const response = await api.put(`invoice/paymentIn/` + id, payload);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function payPendingInvoice(payload) {
  try {
    const response = await api.post(`invoice/paymentIn`, payload);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function deleteInvoice(id) {
  try {
    const response = await api.delete(`invoice/` + id);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function deletePaymentIn(id) {
  try {
    const response = await api.delete(`invoice/paymentIn/` + id);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getInvoicePrint(id) {
  try {
    const response = await api.get(`bill/invoice/` + id, {
      responseType: "blob", // Set the responseType to 'blob'
    });
    const file = new Blob([response?.data], {
      type: "application/pdf",
    });
    const fileURL = window.URL.createObjectURL(file);
    window.open(fileURL);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getPrescriptionPrint(id) {
  try {
    const response = await api.get(`bill/prescription/` + id, {
      responseType: "blob", // Set the responseType to 'blob'
    });
    const file = new Blob([response?.data], {
      type: "application/pdf",
    });
    const fileURL = window.URL.createObjectURL(file);
    window.open(fileURL);
    return response;
  } catch (error) {
    throw error;
  }
}
