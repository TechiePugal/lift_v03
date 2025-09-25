import { api } from "../../../config/axios/interceptor";

export async function getAllTreatments(searchKey) {
  try {
    const response = await api.get(`treatment_master?search=${searchKey}`);
    return response;
  } catch (error) {
    throw error;
  }
}


export async function addTreatments(treatments) {
  try {
    const response = await api.post(`treatment_master`, treatments);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function editTreatments(treatments, id) {
  try {
    const response = await api.put(`treatment_master/`+id, treatments);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function deleteTreatments(id) {
  try {
    const response = await api.delete(`treatment_master/`+id);
    return response;
  } catch (error) {
    throw error;
  }
}
