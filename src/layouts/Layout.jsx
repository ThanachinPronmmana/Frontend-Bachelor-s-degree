import { Outlet } from "react-router"
import Navbar from "../compomemts/navbar/Navbar"
const Layout = () => {
    return (
        <div>
            <Navbar/>
            <Outlet/>
        </div>
    )
}
export default Layout