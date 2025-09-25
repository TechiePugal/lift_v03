import { api } from "../../../config/axios/interceptor";

export async function getAllLabsWorks(searchKey) {
  try {
    const response = await api.get(`lab_work_master?search=${searchKey}`);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function addLabWorks(labworks) {
  try {
    const response = await api.post(`lab_work_master`, labworks);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function editLabWorksData(medicine, id) {
  try {
    const response = await api.put(`lab_work_master/` + id, medicine);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function deleteLabWorkData(id) {
  try {
    const response = await api.delete(`lab_work_master/` + id);
    return response;
  } catch (error) {
    throw error;
  }
}
