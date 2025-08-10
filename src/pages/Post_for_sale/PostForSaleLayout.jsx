// PostForSaleLayout.jsx
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Outlet } from "react-router-dom";

const schema = z.object({
  title: z.string().min(5, "กรุณากรอกหัวข้ออย่างน้อย 5 ตัวอักษร"),
  description: z.string().min(10, "กรุณากรอกรายละเอียด"),
  // ...fields อื่นๆ
});

export default function PostForSaleLayout() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
    },
    mode: "onChange",
  });

  return (
    <FormProvider {...form}>
      <Outlet />
    </FormProvider>
  );
}
