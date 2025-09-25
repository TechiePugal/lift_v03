import { api } from "../../../config/axios/interceptor";

export async function getAllMedicines(searchKey) {
  try {
    const response = await api.get(`medicine_master?search=${searchKey}`);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function addMedicines(medicines) {
  try {
    const response = await api.post(`medicine_master`, medicines);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function editMedicinesDate(medicine, id) {
  try {
    const response = await api.put(`medicine_master/`+id, medicine);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function deleteMedicine(id) {
  try {
    const response = await api.delete(`medicine_master/`+id);
    return response;
  } catch (error) {
    throw error;
  }
}
