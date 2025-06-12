
import { BrowserRouter, Routes, Route,Outlet } from "react-router";
import Home from "../pages/Home";
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

import Login from "@/pages/Login/Login";
import Register from "@/pages/Login/Register";
import Register_buyer from "@/pages/Login/Register_buyer";
import Register_seller from "@/pages/Login/Register_Seller";
import Register_buyer2 from "@/pages/Login/Register_buyer2";
import Register_buyer3 from "@/pages/Login/Register_buyer3";
import Deposit_doc from "@/pages/Deposit_doc";
import Payment from "@/pages/Payment";
import Forgotpassword from "@/pages/Login/Forgotpassword";
import BuyerInfo from "@/pages/Profile/BuyerInfo";
import BuyerNoti from "@/pages/Profile/BuyerNoti";

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
                    <Route path="/Noti" element={<BuyerNoti/>}/>

                    <Route path="/Support" element={<Support />} />
                    <Route path="/Deposit/:id" element={<Deposit/>}/>
                    <Route path="/Login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/Register_buyer" element={<Register_buyer/>}/>
                    <Route path="/Register_seller" element={<Register_seller/>}/>
                    <Route path="/Register_buyer2" element={<Register_buyer2/>}/>
                    <Route path="/Register_buyer3" element={<Register_buyer3/>}/>
                    <Route path="/Deposit_doc" element={<Deposit_doc/>}/>
                    <Route path="/payment" element={<Payment/>}/>
                    <Route path="/forgot" element={<Forgotpassword/>}/>
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