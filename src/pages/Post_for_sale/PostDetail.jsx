// src/pages/Post_for_sale/PostDetail.jsx
import { useEffect } from "react";
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
import { Home } from "lucide-react";
import { useFormData } from "@/context/FormContext";

// Validation schema
const schema = z.object({
  category: z.string().min(1, "กรุณาเลือกประเภท"),
  Usable_Area: z.number().min(0).optional(),
  Land_Size: z.number().min(0).optional(),
  Total_Rooms: z.number().min(0).optional(),
  Year_Built: z.number().min(0).optional(),
  Bedrooms: z.number().min(0),
  Bathroom: z.number().min(0),
  Nearby_Landmarks: z.array(z.string()).optional(),
  Additional_Amenities: z.array(z.string()).optional(),
  Parking_Space: z.string().optional(),
  Description: z.string().optional(),
  images: z.array(z.any()).optional(), // File[]
});

const propertyTypes = [
  "House",
  "Villa",
  "Townhouse",
  "Shop House",
  "Apartment",
  "Condo",
  "Penthouse",
  "Resort",
  "Hotel",
  "Office",
  "Commercial Building",
  "Factory",
  "Warehouse",
  "Land",
  "Other",
];

const landmarks = ["BTS / MRT", "School", "Hospital", "Mall/Market", "Park"];
const amenitiesList = [
  "Swimming Pool",
  "Fitness Center",
  "Co-working Space",
  "Pet Friendly",
  "Children's Playground",
];

const PostDetail = () => {
  const navigate = useNavigate();
  const { formData, updateFormData } = useFormData();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      category: formData.category || "",
      Usable_Area: formData.Usable_Area || undefined,
      Land_Size: formData.Land_Size || undefined,
      Total_Rooms: formData.Total_Rooms || undefined,
      Year_Built: formData.Year_Built || undefined,
      Bedrooms: formData.Bedrooms ?? 1,
      Bathroom: formData.Bathroom ?? 1,
      Nearby_Landmarks: formData.Nearby_Landmarks || [],
      Additional_Amenities: formData.Additional_Amenities || [],
      Parking_Space: formData.Parking_Space || "",
      Description: formData.Description || "",
      images: formData.images || [],
    },
  });

  // update formData whenever form changes
  useEffect(() => {
    const subscription = form.watch((values) => {
      updateFormData(values);
    });
    return () => subscription.unsubscribe();
  }, [form, updateFormData]);

  const toggleArrayValue = (field, value) => {
    const current = form.getValues(field);
    if (current.includes(value)) {
      form.setValue(
        field,
        current.filter((item) => item !== value)
      );
    } else {
      form.setValue(field, [...current, value]);
    }
  };

  const onSubmit = (values) => {
    updateFormData(values);
    navigate("/seller/post-for-sale/price");
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

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Property Type */}
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ประเภทบ้าน</FormLabel>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {propertyTypes.map((type) => (
                          <Button
                            type="button"
                            key={type}
                            variant={
                              field.value === type ? "default" : "outline"
                            }
                            onClick={() => field.onChange(type)}
                          >
                            {type}
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
                    control={form.control}
                    name="Usable_Area"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>พื้นที่ (ตร.ม.)</FormLabel>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value
                                ? parseFloat(e.target.value)
                                : undefined
                            )
                          }
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="Land_Size"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>พื้นที่ดิน (ตร.วา)</FormLabel>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value
                                ? parseFloat(e.target.value)
                                : undefined
                            )
                          }
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="Year_Built"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ปีที่สร้าง</FormLabel>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value
                                ? parseInt(e.target.value)
                                : undefined
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
                    control={form.control}
                    name="Bedrooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ห้องนอน</FormLabel>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="Bathroom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ห้องน้ำ</FormLabel>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="Total_Rooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>จำนวนห้องทั้งหมด</FormLabel>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value
                                ? parseInt(e.target.value)
                                : undefined
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
                  render={() => (
                    <FormItem>
                      <FormLabel>สถานที่ใกล้เคียง</FormLabel>
                      <div className="flex flex-wrap gap-2">
                        {landmarks.map((item) => (
                          <Button
                            type="button"
                            key={item}
                            variant={
                              form.getValues("Nearby_Landmarks").includes(item)
                                ? "default"
                                : "outline"
                            }
                            onClick={() =>
                              toggleArrayValue("Nearby_Landmarks", item)
                            }
                          >
                            {item}
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
                  render={() => (
                    <FormItem>
                      <FormLabel>สิ่งอำนวยความสะดวก</FormLabel>
                      <div className="flex flex-wrap gap-2">
                        {amenitiesList.map((item) => (
                          <Button
                            type="button"
                            key={item}
                            variant={
                              form
                                .getValues("Additional_Amenities")
                                .includes(item)
                                ? "default"
                                : "outline"
                            }
                            onClick={() =>
                              toggleArrayValue("Additional_Amenities", item)
                            }
                          >
                            {item}
                          </Button>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Parking */}
                <FormField
                  control={form.control}
                  name="Parking_Space"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ที่จอดรถ</FormLabel>
                      <select
                        className="w-full p-2 border rounded"
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                      >
                        <option value="">เลือกจำนวนที่จอด</option>
                        <option value="1">1 คัน</option>
                        <option value="2">2 คัน</option>
                        <option value="3">3 คันขึ้นไป</option>
                        <option value="4">ไม่มีที่จอด</option>
                      </select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Description */}
                <FormField
                  control={form.control}
                  name="Description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>หมายเหตุ/คำอธิบาย</FormLabel>
                      <textarea
                        className="w-full p-2 border rounded"
                        placeholder="กรุณาใส่หมายเหตุหรือคำอธิบายเพิ่มเติม"
                        {...field}
                        rows={4}
                      />
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
            </Form>
          </CardContent>
        </Card>
      </div>
    </PostLayout>
  );
};

export default PostDetail;
