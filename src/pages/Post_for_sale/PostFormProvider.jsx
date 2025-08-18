// src/contexts/PostFormContext.jsx
import React from "react";
import { useForm, FormProvider } from "react-hook-form";

export const PostFormProvider = ({ children }) => {
  const methods = useForm({
    // 👇 ค่าเริ่มต้นทั้งหมดที่ตรงกับ Prisma Schema ของคุณ
    defaultValues: {
      // General Info
      Property_Name: "",
      Description: "",
      categoryId: "",
      Sell_Rent: "", // ควรมีค่าเริ่มต้น เช่น "SELL"

      // Location
      Province: "",
      District: "",
      Subdistrict: "",
      Address: "",
      LinkMap: "",
      Latitude: undefined,
      Longitude: undefined,

      // Details
      Usable_Area: undefined, // ใช้ undefined เพื่อให้ placeholder แสดง
      Land_Size: undefined,
      Bedrooms: 1,
      Bathroom: 1,
      Total_Rooms: undefined,
      Year_Built: "",
      Parking_Space: undefined,

      // Features
      Nearby_Landmarks: [], // Array ว่างสำหรับ multi-select
      Additional_Amenities: [], // Array ว่างสำหรับ multi-select

      // Price
      Price: undefined,
      Deposit_Amount: undefined,
      Other_related_expenses: "", // ควรมีค่าเริ่มต้น เช่น "NONE"
      Interest:undefined,
      //Rent
      Deposit_Rent:undefined,
      
      // Contact
      Name: "",
      Phone: undefined,
      Link_line: "",
      Link_facbook: "", // **หมายเหตุ:** ใน Prisma ของคุณสะกดว่า facbook
      Contract_Seller: "",

      // System Internals
      userId: "",
      images: [], // สำหรับเก็บไฟล์รูปภาพ
      notes: "" // field ที่เคยมีใน PostDetail
    },
    mode: "onBlur",
  });
  console.log(methods.getValues())

  return (
    <FormProvider {...methods}>
      {children}
    </FormProvider>
  );
};