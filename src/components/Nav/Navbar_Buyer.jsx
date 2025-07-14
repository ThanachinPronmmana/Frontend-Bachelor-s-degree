import Logo from "./Logo"
import Home from "./Home"
import Profile from "./Profile"
import Post_for_sale from "./Post_for_sale"
import Support from "./Support"
import { Link } from "react-router"
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
import Profile_Buyer from "./Profile_Buyer"
import Support_Buyer from "./Support_Buyer"
const Navbar_Buyer = () => {
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
                Name
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <Profile_Buyer />
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Noti />
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Support_Buyer />
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <p className="text-black font-medium">Logout</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

    </nav>
  )
}

export default Navbar_Buyer
