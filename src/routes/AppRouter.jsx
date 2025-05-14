
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