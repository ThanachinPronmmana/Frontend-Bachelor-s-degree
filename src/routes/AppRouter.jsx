
import { BrowserRouter, Routes, Route,Outlet } from "react-router";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Post_for_sale from "../pages/Post_for_sale";
import Support from "../pages/Support";
import Dashboard from "../pages/admin/dashboard";
import Manage from "../pages/admin/Manage";
import Notfound from "../pages/admin/Notfound";
import Layout from "../layouts/Layout";
import LayoutAdmin from "../layouts/LayoutAdmin";
import Deposit from "@/pages/Deposit";
import Post from "@/pages/Post";
import Login from "@/pages/Login/Login";
import Register from "@/pages/Login/Register";
import Register_buyer from "@/pages/Login/Register_buyer";
import Register_Seller from "@/pages/Login/Register_Seller";
import Register_buyer2 from "@/pages/Login/Register_buyer2";
import Register_buyer3 from "@/pages/Login/Register_buyer3";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Publice */}
                <Route element={
                    <Layout/>
                }>
                    <Route path="/" element={<Home />} />
                    <Route path="Profile" element={<Profile />} />
                    <Route path="Post_for_sale" element={<Post_for_sale />} />
                    <Route path="Support" element={<Support />} />
                    <Route path="Deposit/:id" element={<Deposit/>}/>
                    <Route path="Post" element={<Post/>}/>
                    <Route path="Login" element={<Login/>}/>
                    <Route path="register" element={<Register/>}/>
                    <Route path="Register_buyer" element={<Register_buyer/>}/>
                    <Route path="Register_seller" element={<Register_Seller/>}/>
                    <Route path="Register_buyer2" element={<Register_buyer2/>}/>
                    <Route path="Register_buyer3" element={<Register_buyer3/>}/>
                </Route>



                {/* Private */}
                <Route path="admin" element={
                    <LayoutAdmin/>
                }>

                    <Route index element={<Dashboard />} />
                    <Route path="manage" element={<Manage />} />
                </Route>



                <Route path="*" element={<Notfound />} />
            </Routes>
        </BrowserRouter>
    )
}
export default AppRouter