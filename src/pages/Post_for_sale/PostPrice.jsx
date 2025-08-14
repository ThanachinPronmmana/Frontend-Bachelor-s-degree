// src/pages/Post_for_sale/PostPrice.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Card, CardContent } from "@/components/ui/card";
import { Coins } from "lucide-react";

import { useFormData } from "@/context/FormContext";

const priceSchema = z.object({
  saleType: z.enum(["sale", "rent"], { required_error: "กรุณาเลือกประเภท" }),
  Price: z.number().min(1).optional().nullable(),
  repaymentPeriod: z.string().optional(),
  interest: z.string().optional(),
  rentPrice: z.number().min(1).optional().nullable(),
  Deposit_Amount: z.number().min(0).optional().nullable(),
  expenses: z.string().optional(),
});

const PostPrice = () => {
  const navigate = useNavigate();
  const { formData, updateFormData } = useFormData();

  const form = useForm({
    resolver: zodResolver(priceSchema),
    defaultValues: {
      saleType: formData.saleType || "",
      Price: formData.Price ?? undefined,
      repaymentPeriod: formData.repaymentPeriod || "",
      interest: formData.interest || "",
      rentPrice: formData.rentPrice ?? undefined,
      Deposit_Amount: formData.Deposit_Amount ?? undefined,
      expenses: formData.expenses || "",
    },
  });

  const saleType = form.watch("saleType");

  // อัปเดต context ทุกครั้งที่มีการเปลี่ยนค่า
  useEffect(() => {
    const subscription = form.watch((values) => {
      // map ค่าให้ตรง backend field
      const mappedValues = {
        ...values,
        Price: values.Price ?? formData.Price ?? 0,
        Deposit_Amount: values.Deposit_Amount ?? formData.Deposit_Amount ?? 0,
      };
      updateFormData(mappedValues);
    });
    return () => subscription.unsubscribe();
  }, [form, updateFormData, formData.Price, formData.Deposit_Amount]);

  const onSubmit = (values) => {
    // ส่งค่า map ให้ backend
    const mappedValues = {
      ...values,
      Price: values.Price ?? 0,
      Deposit_Amount: values.Deposit_Amount ?? 0,
    };
    updateFormData(mappedValues);
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
                        value={field.value || ""}
                        onValueChange={field.onChange}
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
                      name="Price"
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
                      name="Deposit_Amount"
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
};

export default PostPrice;
