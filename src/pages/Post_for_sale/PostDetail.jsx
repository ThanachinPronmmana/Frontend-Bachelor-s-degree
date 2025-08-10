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

const schema = z.object({
  type: z.string().min(1, "กรุณาเลือกประเภท"),
  size: z.number().min(0).optional(),
  landArea: z.number().min(0).optional(),
  totalRooms: z.number().min(0).optional(),
  yearBuilt: z.number().min(0).optional(),
  bedrooms: z.number().min(0),
  bathrooms: z.number().min(0),
  nearbyPlaces: z.array(z.string()).optional(),
  amenities: z.array(z.string()).optional(),
  parking: z.string().optional(),
  notes: z.string().optional(),
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
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      type: "",
      size: undefined,
      landArea: undefined,
      totalRooms: undefined,
      yearBuilt: undefined,
      bedrooms: 1,
      bathrooms: 1,
      nearbyPlaces: [],
      amenities: [],
      parking: "",
      notes: "",
    },
  });

  // โหลดข้อมูลจาก localStorage ตอน mount
  useEffect(() => {
    const saved = localStorage.getItem("postData");
    if (saved) {
      const parsed = JSON.parse(saved);
      form.reset({
        type: parsed.type || "",
        size: parsed.size,
        landArea: parsed.landArea,
        totalRooms: parsed.totalRooms,
        yearBuilt: parsed.yearBuilt,
        bedrooms: parsed.bedrooms ?? 1,
        bathrooms: parsed.bathrooms ?? 1,
        nearbyPlaces: parsed.nearbyPlaces || [],
        amenities: parsed.amenities || [],
        parking: parsed.parking || "",
        notes: parsed.notes || "",
      });
    }
  }, [form]);

  // บันทึกข้อมูลทุกครั้งที่ form เปลี่ยน
  useEffect(() => {
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
                  name="type"
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
                    name="size"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>พื้นที่ (ตร.ม.)</FormLabel>
                        <Input
                          type="number"
                          placeholder="เช่น 120"
                          {...field}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value
                                ? Number(e.target.value)
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
                    name="landArea"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>พื้นที่ดิน (ตร.วา)</FormLabel>
                        <Input
                          type="number"
                          placeholder="เช่น 50"
                          {...field}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value
                                ? Number(e.target.value)
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
                    name="yearBuilt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ปีที่สร้าง</FormLabel>
                        <Input
                          type="number"
                          placeholder="เช่น 2015"
                          {...field}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value
                                ? Number(e.target.value)
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
                    name="bedrooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ห้องนอน</FormLabel>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bathrooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ห้องน้ำ</FormLabel>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="totalRooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>จำนวนห้องทั้งหมด</FormLabel>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value
                                ? Number(e.target.value)
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
                  name="nearbyPlaces"
                  render={() => (
                    <FormItem>
                      <FormLabel>สถานที่ใกล้เคียง</FormLabel>
                      <div className="flex flex-wrap gap-2">
                        {landmarks.map((item) => (
                          <Button
                            type="button"
                            key={item}
                            variant={
                              form.getValues("nearbyPlaces").includes(item)
                                ? "default"
                                : "outline"
                            }
                            onClick={() =>
                              toggleArrayValue("nearbyPlaces", item)
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
                  name="amenities"
                  render={() => (
                    <FormItem>
                      <FormLabel>สิ่งอำนวยความสะดวก</FormLabel>
                      <div className="flex flex-wrap gap-2">
                        {amenitiesList.map((item) => (
                          <Button
                            type="button"
                            key={item}
                            variant={
                              form.getValues("amenities").includes(item)
                                ? "default"
                                : "outline"
                            }
                            onClick={() => toggleArrayValue("amenities", item)}
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
                  name="parking"
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

                {/* Notes */}
                <FormField
                  control={form.control}
                  name="notes"
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
