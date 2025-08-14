import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import PostLayout from "@/layouts/PostLayout";
import { MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useFormData } from "@/context/FormContext";

const schema = z.object({
  province: z.string().min(1, "กรุณาเลือกจังหวัด"),
  district: z.string().min(1, "กรุณาเลือกอำเภอ"),
  subDistrict: z.string().min(1, "กรุณาเลือกตำบล"),
  googleMapLink: z.string().url("กรุณากรอกลิงก์ Google Maps ที่ถูกต้อง"),
});

const PostLocation = () => {
  const navigate = useNavigate();
  const { formData, updateFormData } = useFormData();

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [subDistricts, setSubDistricts] = useState([]);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      province: "",
      district: "",
      subDistrict: "",
      googleMapLink: "",
    },
  });

  useEffect(() => {
    Promise.all([
      fetch(
        "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json"
      ).then((res) => res.json()),
      fetch(
        "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_amphure.json"
      ).then((res) => res.json()),
      fetch(
        "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_tambon.json"
      ).then((res) => res.json()),
    ]).then(([provinceData, districtData, subDistrictData]) => {
      setProvinces(provinceData);
      setDistricts(districtData);
      setSubDistricts(subDistrictData);
    });
  }, []);

  // โหลดค่าจาก context
  useEffect(() => {
    form.reset({
      province: formData.province || "",
      district: formData.district || "",
      subDistrict: formData.subDistrict || "",
      googleMapLink: formData.googleMapLink || "",
    });
  }, [formData, form]);

  // อัปเดต context ทุกครั้งที่ค่าฟอร์มเปลี่ยน
  useEffect(() => {
    const subscription = form.watch((value) => {
      updateFormData(value);
    });
    return () => subscription.unsubscribe();
  }, [form, updateFormData]);

  // กรองอำเภอตามจังหวัด
  const filteredDistricts = districts.filter(
    (d) =>
      d.province_id ===
      provinces.find((p) => p.name_th === form.watch("province"))?.id
  );

  // กรองตำบลตามอำเภอ
  const filteredSubDistricts = subDistricts.filter(
    (s) =>
      s.amphure_id ===
      filteredDistricts.find((d) => d.name_th === form.watch("district"))?.id
  );

  const onSubmit = (data) => {
    updateFormData(data);
    navigate("/seller/post-for-sale/detail");
  };

  return (
    <PostLayout currentStep={1}>
      <div className="flex justify-center">
        <Card className="w-full max-w-3xl shadow-xl">
          <CardContent className="py-8 px-6 space-y-6">
            <div className="text-center">
              <MapPin className="mx-auto w-10 h-10 text-primary" />
              <h2 className="text-2xl font-semibold mt-2">ระบุตำแหน่ง</h2>
              <p className="text-muted-foreground text-sm">
                โปรดกรอกข้อมูลสถานที่ตั้งของทรัพย์สิน
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="province"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>จังหวัด</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={(value) => {
                          field.onChange(value);
                          form.setValue("district", "");
                          form.setValue("subDistrict", "");
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="เลือกจังหวัด" />
                        </SelectTrigger>
                        <SelectContent>
                          {provinces.map((p) => (
                            <SelectItem key={p.id} value={p.name_th}>
                              {p.name_th}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="district"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>อำเภอ</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={(value) => {
                          field.onChange(value);
                          form.setValue("subDistrict", "");
                        }}
                        disabled={!form.watch("province")}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="เลือกอำเภอ" />
                        </SelectTrigger>
                        <SelectContent>
                          {filteredDistricts.map((d) => (
                            <SelectItem key={d.id} value={d.name_th}>
                              {d.name_th}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subDistrict"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ตำบล</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
                        disabled={!form.watch("district")}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="เลือกตำบล" />
                        </SelectTrigger>
                        <SelectContent>
                          {filteredSubDistricts.map((s) => (
                            <SelectItem key={s.id} value={s.name_th}>
                              {s.name_th}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="googleMapLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ลิงก์ Google Maps</FormLabel>
                      <Input
                        {...field}
                        placeholder="วางลิงก์ Google Maps ที่นี่"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/seller/post-for-sale/title")}
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

export default PostLocation;
