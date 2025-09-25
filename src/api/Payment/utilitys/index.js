import { api } from "../../../config/axios/interceptor";

export async function getAllUtility(searchKey, startDate, endDate) {
  console.log({startDate});
  try {
    const response = await api.get(
      `utility?search=${searchKey}&startDate=${startDate || ""}&endDate=${
        endDate || ""
      }`
    );
    return response;
  } catch (error) {
    throw error;
  }
}
export async function getSingleUtility(id) {
  try {
    const response = await api.get(`utility/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function addUtility(payload) {
  try {
    const response = await api.post(`utility`, payload);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function updateUtility(payload, id) {
  try {
    const response = await api.put(`utility/` + id, payload);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function deleteUtility(id) {
  try {
    const response = await api.delete(`utility/` + id);
    return response;
  } catch (error) {
    throw error;
  }
}
