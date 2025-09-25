import { api } from "../../../config/axios/interceptor";

export async function getAllDoctors(searchKey) {
  try {
    const response = await api.get(`doctor_master?search=${searchKey}`);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function addDoctor(payload) {
  try {
    const response = await api.post("doctor_master", payload);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function editDoctor(payload, id) {
  try {
    console.log(payload, id);
    const response = await api.put("doctor_master/" + id, payload);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function deleteDoctor(id) {
  try {
    const response = await api.delete("doctor_master/" + id);
    return response;
  } catch (error) {
    throw error;
  }
}
