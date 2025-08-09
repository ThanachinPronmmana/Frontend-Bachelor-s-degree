import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";

const schema = z.object({
  province_id: z.string(),
  amphure_id: z.string(),
  tambon_id: z.string(),
});

const PostLocation = () => {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      province_id: "",
      amphure_id: "",
      tambon_id: "",
    },
  });

  const province_id = form.watch("province_id");
  const amphure_id = form.watch("amphure_id");

  const [provinces, setProvinces] = useState([]);
  const [amphures, setAmphures] = useState([]);
  const [tambons, setTambons] = useState([]);

  const [loadingProvince, setLoadingProvince] = useState(true);
  const [loadingAmphure, setLoadingAmphure] = useState(false);
  const [loadingTambon, setLoadingTambon] = useState(false);

  useEffect(() => {
    setLoadingProvince(true);
    fetch(
      "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json"
    )
      .then((res) => res.json())
      .then((data) => {
        setProvinces(data);
        setLoadingProvince(false);
      });
  }, []);

  useEffect(() => {
    if (!province_id) return;

    form.setValue("amphure_id", "");
    form.setValue("tambon_id", "");
    setAmphures([]);
    setTambons([]);

    setLoadingAmphure(true);
    fetch(
      "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_amphure.json"
    )
      .then((res) => res.json())
      .then((data) => {
        setAmphures(
          data.filter((a) => a.province_id.toString() === province_id)
        );
        setLoadingAmphure(false);
      });
  }, [province_id]);

  useEffect(() => {
    if (!amphure_id) return;

    form.setValue("tambon_id", "");
    setTambons([]);

    setLoadingTambon(true);
    fetch(
      "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_tambon.json"
    )
      .then((res) => res.json())
      .then((data) => {
        setTambons(data.filter((t) => t.amphure_id.toString() === amphure_id));
        setLoadingTambon(false);
      });
  }, [amphure_id]);

  const onSubmit = (values) => {
    navigate("/post-for-sale/detail");
  };

  return (
    <PostLayout currentStep={1}>
      <div className="flex justify-center">
        <Card className="w-full max-w-xl shadow-xl">
          <CardContent className="py-8 px-6 space-y-6">
            <div className="text-center">
              <MapPin className="mx-auto w-10 h-10 text-primary" />
              <h2 className="text-2xl font-semibold mt-2">เลือกทำเลที่ตั้ง</h2>
              <p className="text-muted-foreground text-sm">
                กรุณาเลือกจังหวัด อำเภอ และตำบลของทรัพย์สินของคุณ
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="flex flex-col gap-4 items-center">
                  <div className="w-full max-w-sm ml-60 mr-0">
                    <FormField
                      control={form.control}
                      name="province_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>จังหวัด</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            disabled={loadingProvince}
                          >
                            <SelectTrigger>
                              <SelectValue
                                placeholder={
                                  loadingProvince
                                    ? "กำลังโหลด..."
                                    : "เลือกจังหวัด"
                                }
                              />
                            </SelectTrigger>
                            <SelectContent>
                              {provinces.map((p) => (
                                <SelectItem key={p.id} value={p.id.toString()}>
                                  {p.name_th}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="w-full max-w-sm ml-60 mr-0">
                    <FormField
                      control={form.control}
                      name="amphure_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>อำเภอ</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            disabled={loadingAmphure || !province_id}
                          >
                            <SelectTrigger>
                              <SelectValue
                                placeholder={
                                  loadingAmphure ? "กำลังโหลด..." : "เลือกอำเภอ"
                                }
                              />
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
                  </div>

                  <div className="w-full max-w-sm ml-60 mr-0">
                    <FormField
                      control={form.control}
                      name="tambon_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ตำบล</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            disabled={loadingTambon || !amphure_id}
                          >
                            <SelectTrigger>
                              <SelectValue
                                placeholder={
                                  loadingTambon ? "กำลังโหลด..." : "เลือกตำบล"
                                }
                              />
                            </SelectTrigger>
                            <SelectContent>
                              {tambons.map((t) => (
                                <SelectItem key={t.id} value={t.id.toString()}>
                                  {t.name_th}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/post-for-sale/title")}
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
