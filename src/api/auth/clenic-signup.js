import { api } from "../../config/axios/interceptor";
export const clinic_signup = async (payload) => {
  const response = await api.post(`company`, payload);
  return response;
};
