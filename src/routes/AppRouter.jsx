
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
import ProfileTypeSelector from "@/pages/Profile/ProfileTypeSelector";
import ProfileSeller from "@/pages/Profile/ProfileSeller";
import ProfileBuyer from "@/pages/Profile/ProfileBuyer";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Publice */}
                <Route element={
                    <Layout/>
                }>
                    <Route path="/" element={<Home />} />
                    <Route path="/ProfileTypeSelector" element={<ProfileTypeSelector />} />
                    <Route path="/profile/seller" element={<ProfileSeller />} />
                    <Route path="/profile/buyer" element={<ProfileBuyer />} />
                    <Route path="/post-for-sale/title" element={<PostTitle />} />
                    <Route path="/post-for-sale/location" element={<PostLocation />} />
                    <Route path="/post-for-sale/detail" element={<PostDetail />} />
                    <Route path="/post-for-sale/price" element={<PostPrice />} />
                    <Route path="/post-for-sale/inform" element={<PostInform />} />
                    <Route path="/post-for-sale/upload" element={<PostUpload />} />
                    <Route path="/post-for-sale/confirm" element={<PostConfirm />} />
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