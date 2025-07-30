import Logo from "./Logo"
import Home from "./Home"
import Profile from "./Profile"
import Post_for_sale from "./Post_for_sale"
import Support from "./Support"
import { Link, useNavigate } from "react-router"
import Noti from "./Noti"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AlignJustify } from 'lucide-react';
import { useEffect, useState } from "react"
import ProfileSeller from "@/pages/Profile/ProfileSeller"
import Profile_Seller from "./Profile_Seller"
const Navbar_Seller = () => {
  const [user,setUser] = useState(null)
  const navigate = useNavigate()
  useEffect(()=>{
    const storedUser = localStorage.getItem("user")
    if(storedUser){
      try{
        setUser(JSON.parse(storedUser))
      }catch(err){
        console.error("Error parsing user data",err)
      }
    }
  },[])
  const hdlLogout = ()=>{
    localStorage.removeItem("user")
    localStorage.removeItem("id")
    localStorage.removeItem("token")
    navigate("/")
  }
  return (
    <nav className="py-4 px-5 shadow-md border-b border-gray-200 bg-white">
      <div className="flex flex-col sm:flex-row sm:justify-between items-center ml-70 mr-70">
        <Logo />
        <div className="flex space-x-30 py-2">
          <DropdownMenu >
            <DropdownMenuTrigger>
              <AlignJustify className="cursor-pointer hover:text-blue-300" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                {user ? `${user.First_name} ${user.Last_name}` : "Guest"}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <Profile_Seller />
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Post_for_sale/>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Noti />
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Support />
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={hdlLogout}>
                <p className="text-black font-medium">Logout</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

    </nav>
  )
}

export default Navbar_Seller
