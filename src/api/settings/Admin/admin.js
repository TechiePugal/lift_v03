import { api } from "../../../config/axios/interceptor";

export async function getAllUsers(searchKey) {
  try {
    const response = await api.get(`users?search=${searchKey}`);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function addUser(payload) {
  try {
    const response = await api.post("users", payload);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function editUser(payload, id) {
  try {
    const response = await api.put(`users/` + id, payload);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function deleteUser(id) {
  try {
    const response = await api.delete("users/" + id);
    return response;
  } catch (error) {
    throw error;
  }
}
