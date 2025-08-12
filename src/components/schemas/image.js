import { z } from "zod";
export const imageUploadSchema = z.object({
  image: z.any().refine((file) => file instanceof FileList && file.length > 0, {
    message: "กรุณาอัปโหลดภาพก่อน Submit",
  }),
});
