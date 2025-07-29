import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
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

import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import VerifyEmail from "@/pages/Auth/VerifyEmail";
import Register_buyer from "@/pages/Auth/Register_buyer";
import Register_seller from "@/pages/Auth/Register_Seller";
import Register_buyer2 from "@/pages/Auth/Register_buyer2";
import Register_buyer3 from "@/pages/Auth/Register_buyer3";
import Deposit_doc from "@/pages/Deposit_doc";
import Payment from "@/pages/Payment";
import Forgotpassword from "@/pages/Auth/Forgotpassword";
import BuyerNoti from "@/pages/Profile/BuyerNoti";
import Compare from "@/pages/Compare";
import Resetpassword from "@/pages/Auth/Resetpassword";
import Layout_Buyer from "@/layouts/Layout_Buyer";
import Layout_Seller from "@/layouts/Layout_Seller";
import Profile_Buyer from "@/components/Nav/Profile_Buyer";
import RequireBuyerAuth from "@/components/Auth/RequireBuyerAuth";
import RequireSeller from "@/components/Auth/RequireSeller";


const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Publice */}
                <Route element={
                    <Layout/>
                }>
                    <Route path="/" element={<Home />} />
                    <Route path="/compare" element={<Compare />} />
                    
                    {/* <Route path="/profile/seller" element={<ProfileSeller />} /> */}
                    
                    {/* <Route path="/post-for-sale/title" element={<PostTitle />} />
                    <Route path="/post-for-sale/location" element={<PostLocation />} />
                    <Route path="/post-for-sale/detail" element={<PostDetail />} />
                    <Route path="/post-for-sale/price" element={<PostPrice />} />
                    <Route path="/post-for-sale/inform" element={<PostInform />} />
                    <Route path="/post-for-sale/upload" element={<PostUpload />} />
                    <Route path="/post-for-sale/confirm" element={<PostConfirm />} />
                    <Route path="/Noti" element={<BuyerNoti/>}/> */}

                    
                    <Route path="/support" element={<Support />} />
                    <Route path="/deposit/:id" element={<Deposit />} />
                    <Route path="/Login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/verifyemail" element={<VerifyEmail/>} />
                    <Route path="/resetpassword" element={<Resetpassword/>}/>
                    {/* <Route path="/Register_buyer" element={<Register_buyer/>}/>
                    <Route path="/Register_seller" element={<Register_seller/>}/>
                    <Route path="/Register_buyer2" element={<Register_buyer2/>}/>
                    <Route path="/Register_buyer3" element={<Register_buyer3/>}/>
                    <Route path="/Deposit_doc" element={<Deposit_doc/>}/>
                    <Route path="/payment" element={<Payment/>}/> */}
                    <Route path="/forgot" element={<Forgotpassword/>}/>
                </Route>
                {/* Buyer */}
                <Route path="/buyer" element={<RequireBuyerAuth/>}>
                <Route element={<Layout_Buyer/>}>
                   <Route index element={<Home />} />
                   <Route path="profile" element={<ProfileBuyer/>} />
                   <Route path="support" element={<Support/>}/>
                   <Route path="payment" element={<Payment/>}/> 
                   <Route path="deposit/:id" element={<Deposit/>}/>
                </Route>
                </Route>
               
                {/* Seller */}
                <Route path="/seller" element={<RequireSeller/>}>
                <Route element={<Layout_Seller/>}>
                    <Route index element={<Home />} />
                    <Route path="profile" element={<ProfileSeller/>}/>
                    <Route path="support" element={<Support/>}/>

                </Route>
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