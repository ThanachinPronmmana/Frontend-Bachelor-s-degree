import { Breadcrumb, BreadcrumbLink } from "../ui/breadcrumb"
import { Link, useNavigate } from "react-router"
import { HeartPlus } from 'lucide-react'
import { useEffect, useState } from "react"
const Support = () => {
  const navigate = useNavigate()
  const [userType,setUserType] = useState(null)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      setUserType(user.userType)
    }
  })
  const handleSupport = () => {
    if(userType === "Buyer"){
      navigate("/buyer/support")
    }else if(userType === "Seller"){
      navigate("/seller/support")
    }else{
      navigate("/support")
    }
  }
  return (

    
      <div 
      onClick={handleSupport}
      className="flex justify-center items-center space-x-2">
        <HeartPlus />
        <p className="text-gray-500 hover:text-black opacity-100">Support</p>
      </div>

   
  )
}
export default Support