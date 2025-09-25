import { api } from "../../config/axios/interceptor";

export async function getAllCustomers(searchKey, startDate, endDate) {
  try {
    const response = await api.get(
      // search=${searchKey}&
      `customers
      `
    );
    return response;
  } catch (error) {
    throw error;
  }
}
export async function getSingleCustomer(id) {
  try {
    const response = await api.get(`customers/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getSingleCustomerlift(device_imei) {
  try {
    const response = await api.get(`customers/lift/${device_imei}`);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function addCustomer(payload) {
  try {
    const response = await api.post(`customers`, payload);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function sendtodevice(payload) {
  try {
    const response = await api.post(`customers/sendtodevice`, payload);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function updateCustomer(payload, id) {
  try {
    const response = await api.put(`customers/` + id, payload);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function deleteCustomer(id) {
  try {
    const response = await api.delete(`customers/` + id);
    return response;
  } catch (error) {
    throw error;
  }
}
