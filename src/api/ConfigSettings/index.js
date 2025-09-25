import { api } from "../../config/axios/interceptor";

export async function getAllConfigSettings(searchKey, sort) {
  try {
    const response = await api.get(`config_settings`);
    return response;
  } catch (error) {
    throw error;
  }
}
