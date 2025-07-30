import axios from "axios";

const API_URL = "http://localhost:8200";
export const getbuyer = async (id) => {
  const res = await axios.get(`${API_URL}/api/profile/${id}`);
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
