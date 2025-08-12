import { z } from "zod";

export const buyerSchema = z
  .object({
    First_name: z
      .string()
      .transform((val) => val.trim())
      .refine((val) => val === "" || val.length >= 2, {
        message: "ชื่อต้องมีอย่างน้อย 2 ตัวอักษร",
      })
      .refine((val) => val === "" || /^[A-Za-zก-๙\s]+$/.test(val), {
        message: "ชื่อควรประกอบด้วยตัวอักษรเท่านั้น",
      })
      .optional(),

    Last_name: z
      .string()
      .transform((val) => val.trim())
      .refine((val) => val === "" || val.length >= 2, {
        message: "นามสกุลต้องมีอย่างน้อย 2 ตัวอักษร",
      })
      .refine((val) => val === "" || /^[A-Za-zก-๙\s]+$/.test(val), {
        message: "นามสกุลควรประกอบด้วยตัวอักษรเท่านั้น",
      })
      .optional(),

    Phone: z
      .string()
      .transform((val) => val.trim())
      .refine((val) => val === "" || /^[0-9]+$/.test(val), {
        message: "เบอร์โทรต้องเป็นตัวเลขเท่านั้น",
      })
      .refine((val) => val === "" || val.length >= 2, {
        message: "เบอร์โทรต้องมีอย่างน้อย 2 หลัก",
      })
      .optional(),

    Email: z
      .string()
      .transform((val) => val.trim())
      .refine((val) => val === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
        message: "รูปแบบอีเมลไม่ถูกต้อง",
      })
      .refine((val) => val === "" || val.length >= 6, {
        message: "อีเมลควรมีอย่างน้อย 6 ตัวอักษร",
      })
      .optional(),

    Occaaption: z
      .string()
      .transform((val) => val.trim())
      .refine((val) => val === "" || val.length >= 2, {
        message: "อาชีพต้องมีอย่างน้อย 2 ตัวอักษร",
      })
      .refine((val) => val === "" || /^[A-Za-zก-๙\s]+$/.test(val), {
        message: "อาชีพต้องเป็นตัวอักษรเท่านั้น",
      })
      .optional(),
    Monthly_Income: z
      .string()
      .optional()
      .refine((val) => !val || !isNaN(Number(val)), {
        message: "ข้อมูลไม่ใช่ตัวเลข",
      })
      .transform((val) => (val ? Number(val) : undefined)),
    Family_Size: z
      .string()
      .optional()
      .refine((val) => !val || !isNaN(Number(val)), {
        message: "Family Size must be a number",
      })
      .transform((val) => (val ? Number(val) : undefined)),
    DateofBirth: z.string().optional(),
    Parking_Needs: z.string().optional(),
    Nearby_Facilities: z.string().optional(),
    Lifestyle_Preferences: z.string().optional(),
    Special_Requirements: z.string().optional(),
  })
  .refine(
    (data) => {
      // ตรวจสอบว่ามีฟิลด์ไหนบ้างที่ไม่ว่างเปล่า
      const hasAtLeastOne = Object.values(data).some(
        (val) => val !== undefined && val !== "",
      );
      return hasAtLeastOne;
    },
    {
      message: "กรุณากรอกข้อมูลอย่างน้อย 1 ช่อง",
      path: [], // ให้แสดง error ที่ระดับฟอร์ม
    },
  );
