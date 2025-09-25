import { api } from "../../config/axios/interceptor";

export async function getAllLabs(searchKey, status, lab, startDate, endDate) {
  try {
    const response = await api.get(
      `lab?search=${searchKey}&status=${status}&lab=${lab}&startDate=${
        startDate || ""
      }&endDate=${endDate || ""}`
    );
    return response;
  } catch (error) {
    throw error;
  }
}
export async function getSingleLab(id) {
  try {
    const response = await api.get(`lab/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function addLab(payload) {
  try {
    const response = await api.post(`lab`, payload);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function updateLab(payload, id) {
  try {
    const response = await api.put(`lab/` + id, payload);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function deleteLab(id) {
  try {
    const response = await api.delete(`lab/` + id);
    return response;
  } catch (error) {
    throw error;
  }
}
