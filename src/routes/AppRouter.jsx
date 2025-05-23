
import { BrowserRouter, Routes, Route,Outlet } from "react-router";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Support from "../pages/Support";
import Dashboard from "../pages/admin/dashboard";
import Manage from "../pages/admin/Manage";
import Notfound from "../pages/admin/Notfound";
import Layout from "../layouts/Layout";
import LayoutAdmin from "../layouts/LayoutAdmin";
import Deposit from "@/pages/Deposit";
import PostTitle from "@/pages/Post_for_sale/PostTitle";
import PostLocation from "@/pages/Post_for_sale/PostLocation";
import PostDetail from "@/pages/Post_for_sale/PostDetail";
import PostPrice from "@/pages/Post_for_sale/PostPrice";
import PostInform from "@/pages/Post_for_sale/PostInform";
import PostUpload from "@/pages/Post_for_sale/PostUpload";
import PostConfirm from "@/pages/Post_for_sale/PostConfirm";

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
                    <Route path="PostTitle" element={<PostTitle/>} />
                    <Route path="PostLocation" element={<PostLocation/>} />
                    <Route path="PostDetail" element={<PostDetail/>} />
                    <Route path="PostPrice" element={<PostPrice/>} />
                    <Route path="PostInform" element={<PostInform/>} />
                    <Route path="PostUpload" element={<PostUpload/>} />
                    <Route path="PostConfirm" element={<PostConfirm/>} />
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