import { api } from "../../../config/axios/interceptor";

export async function getAllPatients(searchKey, sort) {
  try {
    const response = await api.get(`patient?search=${searchKey}&sort=${sort}`);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function getSinglePatient(id) {
  try {
    const response = await api.get(`patient/` + id);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function deletePatient(id) {
  try {
    const response = await api.delete(`patient/` + id);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function getAllTreatmentsProfile(id) {
  try {
    const response = await api.get(`treatment/patientID?patient_id=${id}`);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function getAllPrescriptionsProfile(id) {
  try {
    const response = await api.get(`prescription/patientID?patient_id=${id}`);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function getAllAppointmentsProfile(id) {
  try {
    const response = await api.get(`appointment/patientID?patient_id=${id}`);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getTreatmentSummaries(id) {
  try {
    const response = await api.get(`summary/patientID?patient_id=${id}`);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function sendMessageTreatmentSummaries(payload) {
  /**
  eg payload: {
    "summaryId": "65af79d2ccfdb93926166c08",
    "whatsapp": "true",
    "message": "true" 
  }
   */
  try {
    const response = await api.post(`summary/message`, payload);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function printTreatmentSummaries(id) {
  try {
    const response = await api.get(`bill/summery/` + id, {
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

export async function getAllLabsProfile(id) {
  try {
    const response = await api.get(`lab/patientID?patient_id=${id}`);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function getAllinvoiceProfile(id) {
  try {
    const response = await api.get(`invoice/patientID?patient_id=${id}`);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function updatePatientFiles(payload, id) {
  try {
    const response = await api.put(`patient/` + id, payload);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function getProfilePic(id) {
  try {
    const response = await api.get(`patient/getProfilePic/` + id, {
      responseType: "blob",
    });
    const blob = response?.data;

    // Check if blob has data
    if (blob.size > 0) {
      const imageUrl = URL.createObjectURL(blob);
      return imageUrl;
    } else {
      // Return default image URL if blob has no data
      return "/default_pro_pic.png";
    }
  } catch (error) {
    // Handle the error or return a default image URL
    return "/default_pro_pic.png";
  }
}
