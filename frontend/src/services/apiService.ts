import axios from 'axios';

const BASE_URL = 'http://localhost:4000/api/'; // Replace with your actual server URL rightnow my BE code run at 4000

// Define the routes to to crud on ambulances record 
export const getAmbulances = async (page, limit, search) => {
  const response = await axios.get(`${BASE_URL}getAmbulances?page=${page}&limit=${limit}&search=${search}`);
  return { data: response.data.data.data, total: response.data.data.total };
};

export const createAmbulance = async (ambulance) => {
  await axios.post(`${BASE_URL}createAmbulances`, ambulance);
};

export const updateAmbulance = async (id, ambulance) => {
  await axios.put(`${BASE_URL}updateAmbulance/${id}`, ambulance);
};

export const deleteAmbulance = async (id) => {
  await axios.delete(`${BASE_URL}deleteAmbulance/${id}`);
};

// Define the routes to crud on doctors record
export const getDoctors = async (page, limit, search) => {
  const response = await axios.get(`${BASE_URL}getDoctors?page=${page}&limit=${limit}&search=${search}`);
  return { data: response.data.data.data, total: response.data.data.total };
};

export const createDoctor = async (doctor) => {
  await axios.post(`${BASE_URL}createDoctors`, doctor);
};

export const updateDoctor = async (id, doctor) => {
  await axios.put(`${BASE_URL}updateDoctor/${id}`, doctor);
};

export const deleteDoctor = async (id) => {
  await axios.delete(`${BASE_URL}deleteDoctor/${id}`);
};