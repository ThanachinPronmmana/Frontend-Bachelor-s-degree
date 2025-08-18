import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
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

const PostLocation = () => {
  const navigate = useNavigate();
  const form = useFormContext();

  const [provinces, setProvinces] = useState([]);
  const [amphures, setAmphures] = useState([]);
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json"
    )
      .then((res) => res.json())
      .then((data) => setProvinces(data))
      .catch((err) => console.error("โหลดจังหวัด error:", err));
  }, []);

  const handleProvinceChange = (provinceName) => {
    form.resetField("District");
    form.resetField("Subdistrict");
    setAmphures([]);
    setDistricts([]);

    const selectedProvince = provinces.find((p) => p.name_th === provinceName);
    if (!selectedProvince) return;

    // ดึงข้อมูลอำเภอ
    fetch(
      "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_amphure.json"
    )
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter(
          (a) => String(a.province_id) === String(selectedProvince.id)
        );
        setAmphures(filtered);
      });
  };

  const handleDistrictChange = (districtName) => {
    form.resetField("Subdistrict");
    setDistricts([]);

    const selectedAmphure = amphures.find((a) => a.name_th === districtName);
    if (!selectedAmphure) return;

    fetch(
      "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_tambon.json"
    )
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter(
          (d) => String(d.amphure_id) === String(selectedAmphure.id)
        );
        setDistricts(filtered);
      });
  };

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
    navigate("/seller/post-for-sale/detail");
  };

  return (
    <PostLayout currentStep={1}>
      <div className="flex justify-center">
        <Card className="w-full max-w-3xl shadow-xl">
          <CardContent className="py-8 px-6 space-y-6">
            {/* ... ส่วนหัว ... */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* จังหวัด */}
              <FormField
                control={form.control}
                name="Province"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>จังหวัด</FormLabel>
                    <Select
                      value={field.value || ""}
                      onValueChange={(val) => {
                        field.onChange(val);
                        handleProvinceChange(val);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกจังหวัด" />
                      </SelectTrigger>
                      <SelectContent>
                        {provinces.map((prov) => (
                          <SelectItem key={prov.id} value={prov.name_th}>
                            {prov.name_th}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* อำเภอ */}
              <FormField
                control={form.control}
                name="District"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>อำเภอ/เขต</FormLabel>
                    <Select
                      value={field.value || ""}
                      onValueChange={(val) => {
                        field.onChange(val);
                        handleDistrictChange(val);
                      }}
                      disabled={amphures.length === 0}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกอำเภอ/เขต" />
                      </SelectTrigger>
                      <SelectContent>
                        {amphures.map((a) => (
                          <SelectItem key={a.id} value={a.name_th}>
                            {a.name_th}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ตำบล */}
              <FormField
                control={form.control}
                name="Subdistrict"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ตำบล/แขวง</FormLabel>
                    <Select
                      value={field.value || ""}
                      onValueChange={field.onChange}
                      disabled={districts.length === 0}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกตำบล/แขวง" />
                      </SelectTrigger>
                      <SelectContent>
                        {districts.map((d) => (
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

              {/* Google Map */}
              <FormField
                control={form.control}
                name="LikeMap"
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
          </CardContent>
        </Card>
      </div>
    </PostLayout>
  );
};

export default PostLocation;
