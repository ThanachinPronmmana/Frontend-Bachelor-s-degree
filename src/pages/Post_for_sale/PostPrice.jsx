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
import { Coins } from "lucide-react";

const schema = z.object({
  price: z.number().min(1),
  deposit: z.number().min(0),
});

const PostPrice = () => {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      price: 0,
      deposit: 0,
    },
  });

  const onSubmit = (values) => {
    navigate("/post-for-sale/inform");
  };

  return (
    <PostLayout currentStep={3}>
      <div className="flex justify-center">
        <Card className="w-full max-w-xl shadow-xl">
          <CardContent className="py-8 px-6 space-y-6">
            <div className="text-center">
              <Coins className="mx-auto w-10 h-10 text-primary" />
              <h2 className="text-2xl font-semibold mt-2">ตั้งราคาขาย</h2>
              <p className="text-muted-foreground text-sm">
                กำหนดราคาขายและค่ามัดจำของทรัพย์สิน
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ราคาขาย (บาท)</FormLabel>
                      <Input type="number" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="deposit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ค่ามัดจำ (บาท)</FormLabel>
                      <Input type="number" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-between pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/post-for-sale/detail")}
                  >
                    ย้อนกลับ
                  </Button>
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

export default PostPrice;
