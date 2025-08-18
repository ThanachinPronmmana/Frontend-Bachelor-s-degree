import axios from "axios";
const API_URL = "http://localhost:8200"

export const createpost = async (id, data) => {
    const res = await axios.post(`${API_URL}/api/propertypost/${id}`,data)
    return res.data

}