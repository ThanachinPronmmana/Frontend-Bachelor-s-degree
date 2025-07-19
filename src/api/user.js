import axios from "axios"

const API_URL = "http://localhost:8200"
export const getbuyer = async(id)=>{
    const res = await axios.get(`${API_URL}/api/profile/${id}`)
    return res.data
}