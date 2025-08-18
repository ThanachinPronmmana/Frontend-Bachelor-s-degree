import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import PostLayout from "@/layouts/PostLayout";
import { MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const schema = z.object({
  province: z.string().min(1, "กรุณาเลือกจังหวัด"),
  amphure: z.string().min(1, "กรุณาเลือกอำเภอ"),
  district: z.string().min(1, "กรุณาเลือกตำบล"),
  mapLink: z
    .string()
    .url("กรุณากรอก URL ให้ถูกต้อง")
    .optional()
    .or(z.literal("")),
});

const PostLocation = () => {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      province: "",
      amphure: "",
      district: "",
      mapLink: "",
    },
  });

  const [provinces, setProvinces] = useState([]);
  const [amphures, setAmphures] = useState([]);
  const [districts, setDistricts] = useState([]);

  // watch ค่า province และ amphure
  const provinceValue = form.watch("province");
  const amphureValue = form.watch("amphure");

  useEffect(() => {
    // โหลดข้อมูลจังหวัด
    fetch(
      "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json"
    )
      .then((res) => res.json())
      .then((data) => setProvinces(data));
  }, []);

  useEffect(() => {
    if (!provinceValue) {
      setAmphures([]);
      form.setValue("amphure", "");
      setDistricts([]);
      form.setValue("district", "");
      return;
    }

    // โหลดอำเภอเมื่อ province เปลี่ยน
    fetch(
      "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_amphure.json"
    )
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter(
          (a) => String(a.province_id) === String(provinceValue)
        );

        setAmphures(filtered);
      });

    form.setValue("amphure", "");
    setDistricts([]);
    form.setValue("district", "");
  }, [provinceValue, form]);

  useEffect(() => {
    if (!amphureValue) {
      setDistricts([]);
      form.setValue("district", "");
      return;
    }

    // โหลดตำบลเมื่อ amphure เปลี่ยน
    fetch(
      "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_tambon.json"
    )
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter(
          (d) => String(d.amphure_id) === String(amphureValue) // แปลงให้ชนิดตรงกัน
        );
        setDistricts(filtered);
      });

    form.setValue("district", "");
  }, [amphureValue, form]);

  useEffect(() => {
    // โหลดข้อมูลจาก localStorage แล้ว reset form
    const saved = localStorage.getItem("postData");
    if (saved) {
      const parsed = JSON.parse(saved);
      form.reset({
        province: parsed.province || "",
        amphure: parsed.amphure || "",
        district: parsed.district || "",
        mapLink: parsed.mapLink || "",
      });
    }
  }, [form]);

  useEffect(() => {
    // บันทึก localStorage ทุกครั้งที่ form เปลี่ยน
    const subscription = form.watch((value) => {
      const saved = localStorage.getItem("postData");
      const currentData = saved ? JSON.parse(saved) : {};
      localStorage.setItem(
        "postData",
        JSON.stringify({ ...currentData, ...value })
      );
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const onSubmit = (data) => {
    const saved = localStorage.getItem("postData");
    const currentData = saved ? JSON.parse(saved) : {};
    localStorage.setItem(
      "postData",
      JSON.stringify({ ...currentData, ...data })
    );
    navigate("/seller/post-for-sale/detail");
  };

  return (
    <PostLayout currentStep={1}>
      <div className="flex justify-center">
        <Card className="w-full max-w-3xl shadow-xl">
          <CardContent className="py-8 px-6 space-y-6">
            <div className="text-center">
              <MapPin className="mx-auto w-10 h-10 text-primary" />
              <h2 className="text-2xl font-semibold mt-2">
                ตั้งที่ตั้งทรัพย์สิน
              </h2>
              <p className="text-muted-foreground text-sm">
                โปรดเลือกจังหวัด อำเภอ และตำบลของทรัพย์สิน
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
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="เลือกจังหวัด" />
                        </SelectTrigger>
                        <SelectContent>
                          {provinces.map((prov) => (
                            <SelectItem
                              key={prov.id}
                              value={prov.id.toString()}
                            >
                              {prov.name_th}
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
                  name="amphure"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>อำเภอ/เขต</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={!provinceValue}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="เลือกอำเภอ/เขต" />
                        </SelectTrigger>
                        <SelectContent>
                          {amphures.map((a) => (
                            <SelectItem key={a.id} value={a.id.toString()}>
                              {a.name_th}
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
                      <FormLabel>ตำบล/แขวง</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={!amphureValue}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="เลือกตำบล/แขวง" />
                        </SelectTrigger>
                        <SelectContent>
                          {districts.map((d) => (
                            <SelectItem key={d.id} value={d.id.toString()}>
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
                  name="mapLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ลิงค์ Google Map (ถ้ามี)</FormLabel>
                      <input
                        type="url"
                        placeholder="https://maps.google.com/..."
                        {...field}
                        className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-between pt-4">
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
