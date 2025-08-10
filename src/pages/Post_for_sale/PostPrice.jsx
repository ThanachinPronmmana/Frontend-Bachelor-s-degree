import { useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import PostLayout from "@/layouts/PostLayout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Coins } from "lucide-react";

const priceSchema = z.object({
  saleType: z.enum(["sale", "rent"], { required_error: "กรุณาเลือกประเภท" }),
  salePrice: z.number().min(1, "กรุณากรอกราคาขาย").optional().nullable(),
  repaymentPeriod: z.string().optional(),
  interest: z.string().optional(),
  rentPrice: z.number().min(1, "กรุณากรอกค่าเช่า").optional().nullable(),
  deposit: z.number().min(0).optional().nullable(),
  expenses: z.string().optional(),
});

function PostPrice() {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(priceSchema),
    defaultValues: {
      saleType: "",
      salePrice: undefined,
      repaymentPeriod: "",
      interest: "",
      rentPrice: undefined,
      deposit: undefined,
      expenses: "",
    },
  });

  useEffect(() => {
    const saved = localStorage.getItem("postData");
    console.log("loaded from localStorage:", saved);
    if (saved) {
      const parsed = JSON.parse(saved);
      form.reset({
        saleType: parsed.saleType || "",
        salePrice: parsed.salePrice ?? undefined,
        repaymentPeriod: parsed.repaymentPeriod || "",
        interest: parsed.interest || "",
        rentPrice: parsed.rentPrice ?? undefined,
        deposit: parsed.deposit ?? undefined,
        expenses: parsed.expenses || "",
      });
    }
  }, [form]);

  useEffect(() => {
    const subscription = form.watch((value) => {
      console.log("saving to localStorage:", value);
      const saved = localStorage.getItem("postData");
      const currentData = saved ? JSON.parse(saved) : {};
      localStorage.setItem(
        "postData",
        JSON.stringify({ ...currentData, ...value })
      );
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const saleType = form.watch("saleType");

  const onSubmit = (values) => {
    navigate("/seller/post-for-sale/inform");
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
                กำหนดราคาขายหรือค่าเช่าและค่ามัดจำของทรัพย์สิน
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="saleType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ประเภท</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || ""}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="เลือกประเภท" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sale">ขาย</SelectItem>
                          <SelectItem value="rent">ให้เช่า</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {saleType === "sale" && (
                  <>
                    <FormField
                      control={form.control}
                      name="salePrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ราคาขาย (บาท)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="เช่น 2,500,000"
                              {...field}
                              value={field.value ?? ""}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="repaymentPeriod"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ระยะเวลาผ่อน (ปี)</FormLabel>
                          <FormControl>
                            <Input placeholder="เช่น 30" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="interest"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ดอกเบี้ย (%)</FormLabel>
                          <FormControl>
                            <Input placeholder="เช่น 3.5" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {saleType === "rent" && (
                  <>
                    <FormField
                      control={form.control}
                      name="rentPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ค่าเช่า (บาท/เดือน)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="เช่น 15,000"
                              {...field}
                              value={field.value ?? ""}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </FormControl>
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
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="เช่น 30,000"
                              {...field}
                              value={field.value ?? ""}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                <FormField
                  control={form.control}
                  name="expenses"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>รายจ่ายอื่น ๆ</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="เช่น ค่าส่วนกลาง 500 บาท/เดือน"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-between pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/seller/post-for-sale/detail")}
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
}

export default PostPrice;
