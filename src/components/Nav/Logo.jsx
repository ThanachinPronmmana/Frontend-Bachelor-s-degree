import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Link, useNavigate } from "react-router"
const Logo = () => {
  const navigate = useNavigate()
  const [userType, setUserType] = useState(null)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      setUserType(user.userType)
    }
  }, [])
  const handleClick = () => {
    if (userType === "Buyer") {
      navigate("/buyer")
    } else if (userType === "Seller") {
      navigate("/seller")
    } else {
      navigate("/")
    }
  }
  return (


    <div
      onClick={handleClick}
      className="cursor-pointer flex items-center justify-center p-2 rounded-md hover:bg-gray-100 transition duration-200"
    >
      <img
        src="https://i.pinimg.com/736x/fc/16/ef/fc16eff6cd8c7ff12538799b8bd8f82e.jpg"
        alt="Logo"
        className="w-12 h-12 object-cover rounded-full shadow-md"
      />
    </div>


  )
}
export default Logo