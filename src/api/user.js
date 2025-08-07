import axios from "axios";

const API_URL = "http://localhost:8200";
export const getbuyer = async (id) => {
  const res = await axios.get(`${API_URL}/api/profile/${id}`);
  return res.data;
};

export const getSeller = async (id) => {
  const res = await axios.get(`${API_URL}/api/profileseller/${id}`);
  return res.data;
};

export const updateSeller = async (id, data) => {
  const res = await axios.patch(`${API_URL}/api/profileseller/${id}`, data);
  return res.data;
};

export const updateprofile = async (id, data) => {
  const res = await axios.patch(`${API_URL}/api/profile/${id}`, data);
  return res.data;
};

export const updateImage = async (id, data) => {
  const res = await axios.post(`${API_URL}/api/image/${id}`, data);
  return res.data;
};

