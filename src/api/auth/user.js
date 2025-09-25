import { api } from "../../config/axios/interceptor";

export async function requestUserLogin(data) {
  try {
    const response = await api.post("auth/login", data);
    return response;
  } catch (error) {
    throw error;
  }
}

export const getUserProfile = async (config) => {
  const response = await api.get(`auth/me`, config);
  return response.data;
};

export const getOtp = async (number) => {
  const response = await api.post(`auth/sendOtp?phone=` + number);
  return response.data;
};
export const resendOtp = async (number) => {
  const response = await api.post(`auth/resendOtp?phone=` + number);
  return response.data;
};

export const verifyOtp = async (number, otp) => {
  const response = await api.get(
    `auth/verifyOtp?phone=` + number + "&otp=" + otp
  );
  return response.data;
};

export const updateUserProfile = async (payload) => {
  const response = await api.put(`auth/userDetails`, payload);
  return response.data;
};

export const updatePassword = async (config) => {
  const response = await api.put(`auth/updatepassword`, config);
  return response.data;
};

export const updatePasswordOtp = async (config, customToken) => {
  const data = {
    headers: {
      Authorization: `Bearer ${customToken}`,
      // Other headers if needed
    },
  };
  const response = await api.put(`auth/updatepasswordOtp`, config, data);
  return response.data;
};

export const signOut = async () => {
  const response = await api.get(`logout`);
};
