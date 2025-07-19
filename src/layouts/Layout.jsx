import { Outlet } from "react-router"
import Navbar from "@/components/Nav/Navbar"
import Navbarforbuyer from "@/components/Nav/Navbarforbuyer"
const Layout = () => {
    return (
        <div>
            <Navbar/>
            <Outlet/>
        </div>
    )
}
export default Layout