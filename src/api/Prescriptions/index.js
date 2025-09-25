import { api } from "../../config/axios/interceptor";

export async function getAllPrescriptions(searchKey, startDate, endDate) {
  try {
    const response = await api.get(
      // search=${searchKey}&
      `prescription?date=${startDate || ""}&patientId=${searchKey}
      `
    );
    return response;
  } catch (error) {
    throw error;
  }
}
export async function getSinglePrescription(id) {
  try {
    const response = await api.get(`prescription/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function addPrescription(payload) {
  try {
    const response = await api.post(`prescription`, payload);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function updatePrescription(payload, id) {
  try {
    const response = await api.put(`prescription/` + id, payload);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function deletePrescription(id) {
  try {
    const response = await api.delete(`prescription/` + id);
    return response;
  } catch (error) {
    throw error;
  }
}
