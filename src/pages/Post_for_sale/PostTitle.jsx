import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import PostLayout from "@/layouts/PostLayout";
import { FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useFormData } from "@/context/FormContext";
import axios from "axios";

const schema = z.object({
  title: z.string().min(5, "กรุณากรอกหัวข้ออย่างน้อย 5 ตัวอักษร"),
  description: z.string().min(10, "กรุณากรอกรายละเอียดอย่างน้อย 10 ตัวอักษร"),
});

const PostTitle = () => {
  const navigate = useNavigate();
  const { formData, updateFormData } = useFormData();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  // เรียก createpost ครั้งเดียวตอนเข้าหน้า
  useEffect(() => {
    const createInitialPost = async () => {
      if (!formData.postId) {
        try {
          const payload = new FormData();
          payload.append("Property_Name", "");
          payload.append("Description", "");
          payload.append("Price", 0);
          payload.append("Usable_Area", 0);
          payload.append("Land_Size", 0);
          payload.append("Bedrooms", 0);
          payload.append("Bathroom", 0);
          payload.append("categoryId", "DEFAULT_CATEGORY_ID");
          // ถ้าไม่มีรูปภาพ ก็ไม่ต้อง append images

          const userId = formData.userId || "YOUR_USER_ID";
          const res = await axios.post(
            `http://localhost:8200/propertypost/${userId}`,
            payload,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );

          updateFormData({ postId: res.data.id });
        } catch (error) {
          console.error("Error creating initial post:", error);
        }
      }
    };
    createInitialPost();
  }, [formData, updateFormData]);

  useEffect(() => {
    form.reset({
      title: formData.title || "",
      description: formData.description || "",
    });
  }, [formData, form]);

  const onSubmit = (data) => {
    updateFormData(data);
    navigate("/seller/post-for-sale/location");
  };

  return (
    <PostLayout currentStep={0}>
      <div className="flex justify-center">
        <Card className="w-full max-w-3xl shadow-xl">
          <CardContent className="py-8 px-6 space-y-6">
            <div className="text-center">
              <FileText className="mx-auto w-10 h-10 text-primary" />
              <h2 className="text-2xl font-semibold mt-2">ตั้งหัวข้อประกาศ</h2>
              <p className="text-muted-foreground text-sm">
                โปรดตั้งหัวข้อและรายละเอียดเพื่อดึงดูดความสนใจของผู้ซื้อ
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>หัวข้อประกาศ</FormLabel>
                      <Input
                        placeholder="เช่น บ้านเดี่ยว 2 ชั้น ใกล้รถไฟฟ้า"
                        {...field}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>รายละเอียด</FormLabel>
                      <Input
                        placeholder="กรอกรายละเอียดของทรัพย์สิน เช่น ทำเล ขนาด สภาพ"
                        {...field}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end">
                  <Button type="submit">ถัดไป</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </PostLayout>
  );
};

export default PostTitle;
