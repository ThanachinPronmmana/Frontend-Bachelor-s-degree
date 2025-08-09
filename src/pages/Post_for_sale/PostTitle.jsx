// --- PostTitle.tsx ---
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
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";

const schema = z.object({
  title: z.string().min(5, "กรุณากรอกหัวข้ออย่างน้อย 5 ตัวอักษร"),
  description: z.string().min(10, "กรุณากรอกรายละเอียด"),
});

export const PostTitle = () => {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { title: "", description: "" },
  });
  const onSubmit = (values) => navigate("/post-for-sale/location");

  return (
    <PostLayout currentStep={0}>
      <div className="flex justify-center">
        <Card className="w-full max-w-xl bg-white border border-blue-100 shadow-lg">
          <CardContent className="py-8 px-6 space-y-6">
            <div className="text-center">
              <FileText className="mx-auto w-10 h-10 text-blue-600" />
              <h2 className="text-2xl font-semibold mt-2 text-blue-800">
                กรอกหัวข้อประกาศ
              </h2>
              <p className="text-gray-600 text-sm">
                โปรดกรอกหัวข้อและคำอธิบายเกี่ยวกับอสังหาริมทรัพย์ของคุณ
              </p>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>หัวข้อประกาศ</FormLabel>
                      <Input
                        {...field}
                        placeholder="เช่น บ้านเดี่ยว 2 ชั้น ย่านลาดพร้าว"
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
                      <FormLabel>รายละเอียดเบื้องต้น</FormLabel>
                      <Input
                        {...field}
                        placeholder="บรรยายบ้าน จุดเด่น และบริเวณใกล้เคียง"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    ถัดไป
                  </Button>
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
