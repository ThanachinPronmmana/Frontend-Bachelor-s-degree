import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import PostLayout from "@/layouts/PostLayout";
import { FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const PostTitle = () => {
  const navigate = useNavigate();
  const form = useFormContext();

  const onSubmit = () => {
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

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="Property_Name"
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
                name="Description"
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
          </CardContent>
        </Card>
      </div>
    </PostLayout>
  );
};

export default PostTitle;
