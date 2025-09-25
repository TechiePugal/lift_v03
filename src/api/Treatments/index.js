import { api } from "../../config/axios/interceptor";

export async function getAllTreatmentPatients(date, searchKey) {
  try {
    const response = await api.get(
      `patient/treatments?page=1&pageSize=9999&date=${
        date || ""
      }&search=${searchKey}`
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getUpcomingTreatments(id) {
  try {
    const response = await api.get(`/appointment/view/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function getPrescriptions(id) {
  try {
    const response = await api.get(`/prescription/view/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function getLabOrders(id) {
  try {
    const response = await api.get(`/lab/view/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function getInvoices(id) {
  try {
    const response = await api.get(`/invoice/view/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getSingleTreatment(id) {
  try {
    const response = await api.get(`treatment/view/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
}
// export async function getTreatmentSummaries(id) {
//   try {
//     const response = await api.get(`summary?patientId=${id}`);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// }

export async function addTreatmentSummary(payload) {
  try {
    const response = await api.post(`summary`, payload);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function updateTreatmentSummary(payload, id) {
  try {
    const response = await api.put(`summary/` + id, payload);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function deleteTreatmentSummary(id) {
  try {
    const response = await api.delete(`summary/` + id);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function addTreatmentData(payload) {
  try {
    const response = await api.post(`treatment`, payload);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function editTreatmentData(payload, id) {
  try {
    const response = await api.put(`treatment/` + id, payload);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function updateTreatmentImages(images) {
  var formData = new FormData();
  images?.forEach((image, index) => {
    // Append each image with the same key ("file")
    formData.append("file", image);
  });

  try {
    const response = await api.put(`treatment/images`, formData);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getClinicalData(id) {
  try {
    const response = await api.get(`patient/${id}?config=true`);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getEditClinicalData(id, treatmentId) {
  try {
    const response = await api.get(
      `patient/${id}?config=true&treatmentId=${treatmentId}`
    );
    return response;
  } catch (error) {
    throw error;
  }
}
export async function updateClinicalData(id, payload) {
  try {
    const response = await api.put(
      `configuration/patientConfig?patientId=${id}&type=Patient-PreScreening`,
      payload
    );
    return response;
  } catch (error) {
    throw error;
  }
}
export async function updateClinicalDataEdit(id, payload) {
  try {
    const response = await api.put(
      `configuration/patientConfig?patientId=${id}&type=Treatment-PreScreening`,
      payload
    );
    return response;
  } catch (error) {
    throw error;
  }
}
export async function getTreatmentFiles(file) {
  try {
    const response = await api.get(`treatment/images?file=${file}`, {
      responseType: "blob",
    });
    const blob = response?.data;
    const imageUrl = URL.createObjectURL(blob);
    return imageUrl;
  } catch (error) {
    throw error;
  }
}
