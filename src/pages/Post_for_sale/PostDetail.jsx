import React from "react";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
import { Card, CardContent } from "@/components/ui/card";
import { Home } from "lucide-react";

const detailSchema = z.object({
  categoryId: z.string().min(1, "กรุณาเลือกประเภททรัพย์สิน"),
  Usable_Area: z.number().min(0).optional().or(z.literal(undefined)),
  Land_Size: z.number().min(0).optional().or(z.literal(undefined)),
  Total_Rooms: z.number().min(0).optional().or(z.literal(undefined)),
  Year_Built: z.string().optional(),
  Bedrooms: z.number().min(0),
  Bathroom: z.number().min(0),
  Nearby_Landmarks: z.array(z.string()).optional(),
  Additional_Amenities: z.array(z.string()).optional(),
  Parking_Space: z.number().optional().or(z.literal(undefined)),
  notes: z.string().optional(),
});

const categories = [
  { id: "cmegzfdya0006w2bwq5d8alc7", name: "Condo" },
  { id: "cmegzfhx70007w2bwp63cbc1w", name: "House" },
  { id: "cmegzfls20008w2bwf0arh8jq", name: "Land" },
  { id: "cmegzfov30009w2bwrxjpt7xn", name: "Villa" },
  { id: "cmegzft08000aw2bwx91l68z9", name: "Townhouse" },
  { id: "cmegzg3t1000cw2bw8shu6whw", name: "Shop House" },
  { id: "cmegzg9ez000dw2bwgkdliy1a", name: "Apartment" },
  { id: "cmegzgcmy000ew2bw72nen7zo", name: "Penthouse" },
  { id: "cmegzgfvz000fw2bwgppl0ci5", name: "Resort" },
  { id: "cmegzgif1000gw2bw1z7xda7u", name: "Hotel" },
  { id: "cmegzgky4000hw2bwe83xrvrg", name: "Office" },
  { id: "cmegzgq6g000iw2bwl51st9pg", name: "Commercial Building" },
  { id: "cmegzgu1s000jw2bwdhco4e1r", name: "Factory" },
  { id: "cmegzgxsj000kw2bwebelhpmm", name: "Warehouse" },
];

const landmarks = ["BTS_MRT", "School", "Hospital", "Mall_Market", "Park"];
const amenitiesList = [
  "Swimming_Pool",
  "Fitness_Center",
  "Co_working_Space",
  "Pet_Friendly",
];

const PostDetail = () => {
  const navigate = useNavigate();
  const form = useFormContext();

  const toggleArrayValue = (fieldName, value) => {
    const currentValues = form.getValues(fieldName) || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value];
    form.setValue(fieldName, newValues, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const onSubmit = (data) => {
    console.log("Data from Detail Step:", data);
    navigate("/seller/post-for-sale/price");
  };

  const formatDisplayName = (name) => {
    return name.replace(/_/g, " ").replace("MRT", "/ MRT");
  };

  return (
    <PostLayout currentStep={2}>
      <div className="flex justify-center">
        <Card className="w-full max-w-3xl shadow-xl">
          <CardContent className="py-8 px-6 space-y-6">
            <div className="text-center">
              <Home className="mx-auto w-10 h-10 text-primary" />
              <h2 className="text-2xl font-semibold mt-2">
                รายละเอียดทรัพย์สิน
              </h2>
              <p className="text-muted-foreground text-sm">
                โปรดกรอกข้อมูลทรัพย์สินของคุณ
              </p>
            </div>

            {/* 4. ไม่ต้องมี <Form {...form}> เพราะ Provider จัดการให้แล้ว */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* --- 5. ปรับ name ของ FormField ทั้งหมดเป็น Pascal_Case --- */}

              {/* Property Type */}
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ประเภททรัพย์สิน</FormLabel>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {categories.map((category) => (
                        <Button
                          type="button"
                          key={category.id}
                          variant={
                            field.value === category.id ? "default" : "outline"
                          }
                          onClick={() =>
                            form.setValue("categoryId", category.id, {
                              shouldValidate: true,
                              shouldDirty: true,
                            })
                          }
                        >
                          {category.name}
                        </Button>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Size / Land Area / Year Built */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  name="Usable_Area"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>พื้นที่ (ตร.ม.)</FormLabel>
                      <Input
                        type="number"
                        placeholder="เช่น 120"
                        {...field}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? Number(e.target.value) : undefined
                          )
                        }
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="Land_Size"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>พื้นที่ดิน (ตร.วา)</FormLabel>
                      <Input
                        type="number"
                        placeholder="เช่น 50"
                        {...field}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? Number(e.target.value) : undefined
                          )
                        }
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="Year_Built"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ปีที่สร้าง</FormLabel>
                      <Input
                        type="number"
                        placeholder="เช่น 2015"
                        {...field}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? Number(e.target.value) : undefined
                          )
                        }
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Bedrooms / Bathrooms / Total Rooms */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  name="Bedrooms"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ห้องนอน</FormLabel>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? Number(e.target.value) : undefined
                          )
                        }
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="Bathroom"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ห้องน้ำ</FormLabel>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="Total_Rooms"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>จำนวนห้องทั้งหมด</FormLabel>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? Number(e.target.value) : undefined
                          )
                        }
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Nearby Landmarks */}
              <FormField
                control={form.control}
                name="Nearby_Landmarks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>สถานที่ใกล้เคียง</FormLabel>
                    <div className="flex flex-wrap gap-2">
                      {landmarks.map((item) => (
                        <Button
                          type="button" // 👈 เพิ่มบรรทัดนี้
                          variant={
                            (field.value || []).includes(item)
                              ? "default"
                              : "outline"
                          }
                          onClick={() =>
                            toggleArrayValue("Nearby_Landmarks", item)
                          }
                        >
                          {formatDisplayName(item)}
                        </Button>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Amenities */}
              <FormField
                control={form.control}
                name="Additional_Amenities"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>สิ่งอำนวยความสะดวก</FormLabel>
                    <div className="flex flex-wrap gap-2">
                      {amenitiesList.map((item) => (
                        <Button
                          type="button" // 👈 เพิ่มบรรทัดนี้
                          key={item}
                          variant={
                            (field.value || []).includes(item)
                              ? "default"
                              : "outline"
                          }
                          onClick={() =>
                            toggleArrayValue("Additional_Amenities", item)
                          }
                        >
                          {formatDisplayName(item)}
                        </Button>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Parking */}
              <FormField
                name="Parking_Space"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ที่จอดรถ</FormLabel>
                    <select
                      className="w-full p-2 border rounded"
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const stringValue = e.target.value;

                        field.onChange(
                          stringValue === ""
                            ? undefined
                            : parseInt(stringValue, 10)
                        );
                      }}
                    >
                      <option value="">เลือกจำนวนที่จอด</option>
                      <option value="0">ไม่มีที่จอด</option>
                      <option value="1">1 คัน</option>
                      <option value="2">2 คัน</option>
                      <option value="3">3 คันขึ้นไป</option>
                    </select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Navigation */}
              <div className="flex justify-between pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/seller/post-for-sale/location")}
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

export default PostDetail;
