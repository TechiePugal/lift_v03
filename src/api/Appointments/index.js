import { api } from "../../config/axios/interceptor";

export async function getAllAppointments(
  searchKey,
  status,
  selectedDoctor,
  startDate,
  endDate
) {
  try {
    const response = await api.get(
      `appointment?search=${searchKey || ""}&status=${status || ""}&doctor=${
        selectedDoctor || ""
      }&startDate=${startDate || ""}&endDate=${endDate || ""}`
    );
    return response;
  } catch (error) {
    throw error;
  }
}
export async function getSingleAppointments(id) {
  try {
    const response = await api.get(`appointment/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function addAppointment(payload) {
  try {
    const response = await api.post(`appointment`, payload);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function addBulkAppointments(payload) {
  try {
    const response = await api.post(`appointment/bulkappointment`, payload);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function updateAppointment(payload, id) {
  try {
    const response = await api.put(`appointment/` + id, payload);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function deleteAppointment(id) {
  try {
    const response = await api.delete(`appointment/` + id);
    return response;
  } catch (error) {
    throw error;
  }
}
