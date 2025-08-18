// PostForSaleLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";

const PostForSaleLayout = () => {
  // ไม่ต้องมี useForm ที่นี่อีกต่อไป!
  // มันจะถูกจัดการโดย PostFormProvider ที่อยู่ข้างนอกแล้ว
  return <Outlet />;
};

export default PostForSaleLayout;