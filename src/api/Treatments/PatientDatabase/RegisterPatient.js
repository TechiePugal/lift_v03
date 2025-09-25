import { api } from "../../../config/axios/interceptor";

export async function getPatientId() {
  try {
    const response = await api.get(`patient/getserialno`);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function registerPatient(payload) {
  try {
    const response = await api.post(`patient`, payload);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function updatePatient(payload, id) {
  try {
    const response = await api.put(`patient/` + id, payload);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function uploadPatientImage(payload, id) {
  var formData = new FormData();
  formData.append("file", payload);
  try {
    const response = await api.put(`patient/profilePicture/` + id, formData);
    return response;
  } catch (error) {
    throw error;
  }
}
