import { api } from "../../../config/axios/interceptor";

export async function getAllLabs(searchKey) {
  try {
    const response = await api.get(`lab_master?search=${searchKey}`);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function addLab(medicines) {
  try {
    const response = await api.post(`lab_master`, medicines);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function editLabsData(medicine, id) {
  try {
    const response = await api.put(`lab_master/` + id, medicine);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function deleteLabsData(id) {
  try {
    const response = await api.delete(`lab_master/` + id);
    return response;
  } catch (error) {
    throw error;
  }
}
