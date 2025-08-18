import { useForm, useFormContext } from "react-hook-form";
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
import { User } from "lucide-react";
import { useContext, useEffect } from "react";

const PostInform = () => {
  const navigate = useNavigate();
  const form = useFormContext();

  const onSubmit = (data) => {
    console.log(data);
    navigate("/seller/post-for-sale/upload");
  };

  return (
    <PostLayout currentStep={4}>
      <div className="flex justify-center">
        <Card className="w-full max-w-xl shadow-xl">
          <CardContent className="py-8 px-6 space-y-6">
            <div className="text-center">
              <User className="mx-auto w-10 h-10 text-primary" />
              <h2 className="text-2xl font-semibold mt-2">ข้อมูลผู้ขาย</h2>
              <p className="text-muted-foreground text-sm">
                โปรดกรอกชื่อและเบอร์โทรศัพท์ของผู้ขาย
              </p>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="Name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ชื่อผู้ขาย</FormLabel>
                    <Input {...field} placeholder="นายสมชาย บ้านดี" />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>เบอร์โทรศัพท์</FormLabel>
                    <Input {...field} placeholder="0812345678" />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/seller/post-for-sale/price")}
                >
                  ย้อนกลับ
                </Button>
                <Button type="submit">ถัดไป</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </PostLayout>
  );
};

export default PostInform;
