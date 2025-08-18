import React from "react";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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

const priceSchema = z.object({
  Sell_Rent: z.enum(["SALE", "RENT"], { required_error: "กรุณาเลือกประเภท" }),
  Price: z.number().min(1, "กรุณากรอกราคา").optional().nullable(),
  Deposit_Amount: z.number().min(0).optional().nullable(),
  Interest: z.number().min(0).optional().nullable(),
  Deposit_Rent: z.number().min(0).optional().nullable(),
  Other_related_expenses: z.string().optional(),
});

function PostPrice() {
  const navigate = useNavigate();
  const form = useFormContext();

  const sellRentType = form.watch("Sell_Rent");

  const onSubmit = (data) => {
    console.log("Data from Price Step:", data);
    navigate("/seller/post-for-sale/inform");
  };

  const handleFloatChange = (e, field) => {
    const value = e.target.value;
    field.onChange(value === "" ? undefined : parseFloat(value));
  };

  return (
    <PostLayout currentStep={3}>
      <div className="flex justify-center">
        <Card className="w-full max-w-xl shadow-xl">
          <CardContent className="py-8 px-6 space-y-6">
            <div className="text-center">
              <Coins className="mx-auto w-10 h-10 text-primary" />
              <h2 className="text-2xl font-semibold mt-2">ตั้งราคา</h2>
              <p className="text-muted-foreground text-sm">
                กำหนดราคาขายหรือค่าเช่าและรายละเอียดทางการเงิน
              </p>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="Sell_Rent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ประเภทการลงประกาศ</FormLabel>
                    <Select
                      onValueChange={(val) => {
                        field.onChange(val);
                        if (val === "RENT") {
                          form.setValue("Deposit_Amount", undefined);
                          form.setValue("Interest", 0);
                        } else if (val === "SALE") {
                          form.setValue("Deposit_Rent", undefined);
                          form.setValue("Interest", undefined);
                        }
                      }}
                      value={field.value || ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="เลือกประเภท" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="SALE">ขาย</SelectItem>
                        <SelectItem value="RENT">ให้เช่า</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {sellRentType === "SALE" && (
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
                            placeholder="เช่น 2500000"
                            {...field}
                            value={field.value ?? ""}
                            onChange={(e) => handleFloatChange(e, field)}
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
                        <FormLabel>เงินดาวน์ (บาท)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="เช่น 250000"
                            {...field}
                            value={field.value ?? ""}
                            onChange={(e) => handleFloatChange(e, field)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="Interest"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ดอกเบี้ยโดยประมาณ (% ต่อปี)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="เช่น 3.5"
                            {...field}
                            value={field.value ?? ""}
                            onChange={(e) => handleFloatChange(e, field)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {sellRentType === "RENT" && (
                <>
                  <FormField
                    control={form.control}
                    name="Price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ค่าเช่า (บาท/เดือน)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="เช่น 15000"
                            {...field}
                            value={field.value ?? ""}
                            onChange={(e) => handleFloatChange(e, field)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="Deposit_Rent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ค่ามัดจำสำหรับเช่า (บาท)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="เช่น 30000"
                            {...field}
                            value={field.value ?? ""}
                            onChange={(e) => handleFloatChange(e, field)}
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
                name="Other_related_expenses"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>รายจ่ายอื่น ๆ (ถ้ามี)</FormLabel>
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
          </CardContent>
        </Card>
      </div>
    </PostLayout>
  );
}

export default PostPrice;
