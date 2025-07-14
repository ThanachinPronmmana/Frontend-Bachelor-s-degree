import axios from "axios"
const API_URL = "http://localhost:8200"

export const preregister = async (payload) =>{
    const res = await axios.post(`${API_URL}/api/preRegister`,payload)
    return res.data
}
export const verifyandregister = async(payload)=>{
    const res = await axios.post(`${API_URL}/api/verifyandregister`,payload)
    return res.data
}
export const login = async(data)=>{
    const res = await axios.post(`${API_URL}/api/login`,data)
    return res.data
}
export const forgotpassword = async(data)=>{
    const res = await axios.post(`${API_URL}/api/forgotpassword`,data)
    return res.data
}
export const resetpassword = async(data)=>{
    const res = await axios.post(`${API_URL}/api/resetpassword`,data)
    return res.data
}