import { BrowserRouter, Routes, Route } from "react-router-dom";

// 🔧 Layouts
import Layout from "../layouts/Layout";
import LayoutAdmin from "../layouts/LayoutAdmin";

// 🏠 Public Pages
import Home from "../pages/Home";
import Support from "../pages/Support";
import Compare from "@/pages/Compare";

// 👤 Profile
import ProfileTypeSelector from "@/pages/Profile/ProfileTypeSelector";
import ProfileSeller from "@/pages/Profile/ProfileSeller";
import ProfileBuyer from "@/pages/Profile/ProfileBuyer";
import BuyerNoti from "@/pages/Profile/BuyerNoti";

// 📝 Post for Sale
import PostTitle from "@/pages/Post_for_sale/PostTitle";
import PostLocation from "@/pages/Post_for_sale/PostLocation";
import PostDetail from "@/pages/Post_for_sale/PostDetail";
import PostPrice from "@/pages/Post_for_sale/PostPrice";
import PostInform from "@/pages/Post_for_sale/PostInform";
import PostUpload from "@/pages/Post_for_sale/PostUpload";
import PostConfirm from "@/pages/Post_for_sale/PostConfirm";

// 🔐 Auth & Register
import Login from "@/pages/Login/Login";
import Register from "@/pages/Login/Register";
import Register_buyer from "@/pages/Login/Register_buyer";
import Register_buyer2 from "@/pages/Login/Register_buyer2";
import Register_buyer3 from "@/pages/Login/Register_buyer3";
import Register_seller from "@/pages/Login/Register_Seller";
import Forgotpassword from "@/pages/Login/Forgotpassword";

// 💸 Deposit & Payment
import Deposit from "@/pages/Deposit";
import Deposit_doc from "@/pages/Deposit_doc";
import Payment from "@/pages/Payment";

// 🛠️ Admin Pages
import Dashboard from "@/pages/admin/dashboard";
import Manage from "@/pages/admin/Manage";
import Notfound from "@/pages/admin/Notfound";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/*  Public Routes */}
        <Route element={<Layout />}>
          {/*  General */}
          <Route path="/" element={<Home />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/support" element={<Support />} />

          {/*  Profile */}
          <Route path="/profileTypeSelector" element={<ProfileTypeSelector />} />
          <Route path="/profile/seller" element={<ProfileSeller />} />
          <Route path="/profile/buyer" element={<ProfileBuyer />} />
          <Route path="/noti" element={<BuyerNoti />} />

          {/*  Post for Sale */}
          <Route path="/post-for-sale/title" element={<PostTitle />} />
          <Route path="/post-for-sale/location" element={<PostLocation />} />
          <Route path="/post-for-sale/detail" element={<PostDetail />} />
          <Route path="/post-for-sale/price" element={<PostPrice />} />
          <Route path="/post-for-sale/inform" element={<PostInform />} />
          <Route path="/post-for-sale/upload" element={<PostUpload />} />
          <Route path="/post-for-sale/confirm" element={<PostConfirm />} />

          {/*  Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register_buyer" element={<Register_buyer />} />
          <Route path="/register_buyer2" element={<Register_buyer2 />} />
          <Route path="/register_buyer3" element={<Register_buyer3 />} />
          <Route path="/register_seller" element={<Register_seller />} />
          <Route path="/forgot" element={<Forgotpassword />} />

          {/*  Deposit / Payment */}
          <Route path="/deposit/:id" element={<Deposit />} />
          <Route path="/deposit_doc" element={<Deposit_doc />} />
          <Route path="/payment" element={<Payment />} />
        </Route>

        {/*  Admin Routes */}
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<Dashboard />} />
          <Route path="manage" element={<Manage />} />
        </Route>

        {/*  Not Found */}
        <Route path="*" element={<Notfound />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
