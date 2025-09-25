import { api } from "../../config/axios/interceptor";

export async function getSettingsCounts() {
  try {
    const response = await api.get(`common/settingsCount`);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function getSerialNumber() {
  try {
    const response = await api.get(`patient/getserialno`);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function getHospitalInfo(companyId) {
  try {
    const response = await api.get(`company/${companyId}`);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function updateHospitalInfo(payload, companyId) {
  try {
    const response = await api.put(`company/${companyId}`, payload);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function updateSerialNumberApi(payload) {
  try {
    const response = await api.put(`patient/updateSerialno`, payload);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function updateCompanyInfo(payload, id) {
  try {
    const response = await api.put(`company/` + id, payload);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function uploadHospitalLogo(payload, id) {
  var formData = new FormData();
  formData.append("file", payload);
  try {
    const response = await api.put(`company/logoPicture/${id}`, formData);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function getHospitalLogo(id) {
  try {
    const response = await api.get(`company/getLogoPic/${id}`, {
      responseType: "blob",
    });
    const blob = response?.data;
    const imageUrl = URL.createObjectURL(blob);
    return imageUrl;
  } catch (error) {
    throw error;
  }
}
export async function uploadHospitalsign(payload, id) {
  var formData = new FormData();
  formData.append("file", payload);
  try {
    const response = await api.put(`company/signPicture/${id}`, formData);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function updateTreatmentQty(payload, id) {
  try {
    const response = await api.put(`company/${id}`, payload);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function getHospitalsign(id) {
  try {
    const response = await api.get(`company/getSignPic/${id}`, {
      responseType: "blob",
    });
    const blob = response?.data;
    const imageUrl = URL.createObjectURL(blob);
    return imageUrl;
  } catch (error) {
    throw error;
  }
}
export async function updateSubscription(payload) {
  try {
    const response = await api.put(`chargebee/subscription`, payload);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function getSummaryPreview() {
  try {
    const response = await api.get(`bill/preview`,{
      responseType: "blob", // Set the responseType to 'blob'
    });
    const file = new Blob([response?.data], {
      type: "application/pdf",
    });
    const fileURL = window.URL.createObjectURL(file);
    window.open(fileURL);
    return response;
  } catch (error) {
    throw error;
  }
}
