import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

// Layouts
import Layout from "../layouts/Layout";
import LayoutAdmin from "../layouts/LayoutAdmin";
import Layout_Buyer from "@/layouts/Layout_Buyer";
import Layout_Seller from "@/layouts/Layout_Seller";

// Guards
import RequireBuyerAuth from "@/components/Auth/RequireBuyerAuth";
import RequireSeller from "@/components/Auth/RequireSeller";

// Public Pages
import Home from "../pages/Home";
import Support from "../pages/Support";
import Compare from "@/pages/Compare";

// Profile Pages
import ProfileTypeSelector from "@/pages/Profile/ProfileTypeSelector";
import ProfileSeller from "@/pages/Profile/ProfileSeller";
import ProfileBuyer from "@/pages/Profile/ProfileBuyer";
import BuyerNoti from "@/pages/Profile/BuyerNoti";

// Post for Sale Layout
import PostForSaleLayout from "@/pages/Post_for_sale/PostForSaleLayout";

// Post for Sale Pages
import PostTitle from "@/pages/Post_for_sale/PostTitle";
import PostLocation from "@/pages/Post_for_sale/PostLocation";
import PostDetail from "@/pages/Post_for_sale/PostDetail";
import PostPrice from "@/pages/Post_for_sale/PostPrice";
import PostInform from "@/pages/Post_for_sale/PostInform";
import PostUpload from "@/pages/Post_for_sale/PostUpload";
import PostConfirm from "@/pages/Post_for_sale/PostConfirm";

// Auth Pages
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import Register_buyer from "@/pages/Auth/Register_buyer";
import Register_buyer2 from "@/pages/Auth/Register_buyer2";
import Register_buyer3 from "@/pages/Auth/Register_buyer3";
import Register_seller from "@/pages/Auth/Register_Seller";
import ForgotPassword from "@/pages/Auth/Forgotpassword";
import Resetpassword from "@/pages/Auth/Resetpassword";
import VerifyEmail from "@/pages/Auth/VerifyEmail";

// Deposit & Payment
import Deposit from "@/pages/Deposit";
import Deposit_doc from "@/pages/Deposit_doc";
import Payment from "@/pages/Payment";

// Admin Pages - Posts of Seller
import Approval from "@/pages/admin/Posts of Seller/Approval";
import AcceptPost from "@/pages/admin/Posts of Seller/AcceptPost";
import RejectPost from "@/pages/admin/Posts of Seller/RejectPost";

// Admin Pages - User Account
import BuyerId from "@/pages/admin/User account/BuyerId";
import VerificationSeller from "@/pages/admin/User account/VerificationSeller";
import VerifiedSeller from "@/pages/admin/User account/VerifiedSeller";
import RejectSeller from "@/pages/admin/User account/RejectSeller";

// Admin Pages - Payment Management
import PayDeposit from "@/pages/admin/Payment/PayDeposit";
import PayBank from "@/pages/admin/Payment/PayBank";
import DescriptionReport from "@/pages/admin/DescriptionReport";
import { PostFormProvider } from "@/pages/Post_for_sale/PostFormProvider";
import { AuthProvider } from "@/context/AuthContext";

const AppRouter = () => {
  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        {/* 🌐 Public Routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/support" element={<Support />} />
          <Route path="/noti" element={<BuyerNoti />} />

          {/* Profile Selection */}
          <Route
            path="/profileTypeSelector"
            element={<ProfileTypeSelector />}
          />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register_buyer" element={<Register_buyer />} />
          <Route path="/register_buyer2" element={<Register_buyer2 />} />
          <Route path="/register_buyer3" element={<Register_buyer3 />} />
          <Route path="/register_seller" element={<Register_seller />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/resetpassword" element={<Resetpassword />} />
          <Route path="/verifyemail" element={<VerifyEmail />} />

          {/* Deposit & Payment */}
          <Route path="/deposit/:id" element={<Deposit />} />
          <Route path="/deposit_doc" element={<Deposit_doc />} />
          <Route path="/payment" element={<Payment />} />
        </Route>

        {/* 👤 Buyer Routes (Protected) */}
        <Route path="/buyer" element={<RequireBuyerAuth />}>
          <Route element={<Layout_Buyer />}>
            <Route index element={<Home />} />
            <Route path="profile" element={<ProfileBuyer />} />
            <Route path="support" element={<Support />} />
            <Route path="payment" element={<Payment />} />
            <Route path="deposit/:id" element={<Deposit />} />
          </Route>
        </Route>

        {/* 👤 Seller Routes (Protected) */}
        <Route path="/seller" element={<RequireSeller />}>
          <Route element={<Layout_Seller />}>
            <Route index element={<Home />} />
            <Route path="profile" element={<ProfileSeller />} />
            <Route path="support" element={<Support />} />

            {/* Post For Sale - Seller Access */}
            <Route element={<PostFormProvider><Outlet/></PostFormProvider>}>
            <Route path="post-for-sale" element={<PostForSaleLayout />}>
              <Route path="title" element={<PostTitle />} />
              <Route path="location" element={<PostLocation />} />
              <Route path="detail" element={<PostDetail />} />
              <Route path="price" element={<PostPrice />} />
              <Route path="inform" element={<PostInform />} />
              <Route path="upload" element={<PostUpload />} />
              <Route path="confirm" element={<PostConfirm />} />
            </Route>
            </Route>
          </Route>
        </Route>

        {/* 🔐 Admin Routes */}
        <Route path="/admin" element={<LayoutAdmin />}>
          {/* Dashboard */}
          <Route index element={<Approval />} />
          <Route path="approval" element={<Approval />} />
          <Route path="accept-post" element={<AcceptPost />} />
          <Route path="reject-post" element={<RejectPost />} />

          {/* User Management */}
          <Route path="buyer-id" element={<BuyerId />} />
          <Route path="seller-id/verify" element={<VerificationSeller />} />
          <Route path="seller-id/verified" element={<VerifiedSeller />} />
          <Route path="seller-id/reject" element={<RejectSeller />} />

          {/* Payment Management */}
          <Route path="pay-deposit" element={<PayDeposit />} />
          <Route path="pay-bank" element={<PayBank />} />
          <Route path="description-report" element={<DescriptionReport />} />
        </Route>
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRouter;
