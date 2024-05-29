import jwt from "jsonwebtoken";
import { UserPayload } from "~/models/payload";
import { supabase } from "~/utils/supabase";

export default defineEventHandler(async (event) => {
  try {
    const token = getCookie(event, "token") as string;
    if (!token) {
      setResponseStatus(event, 401);
      return { message: "Unauthorized" };
    }

    const verfied = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
    if (!verfied) {
      setResponseStatus(event, 401);
      return { message: "Unauthorized" };
    }

    const pdf = event.context.params?.pdf;
    const { data } = await supabase.storage
      .from(process.env.SUPABASE_BUCKET_NAME!)
      .getPublicUrl(`${verfied.id}/Focus/${pdf}`);
    if (!data) {
      setResponseStatus(event, 404);
      return { message: "File not found" };
    }
    const decodedUrl = decodeURIComponent(data.publicUrl);

    setResponseStatus(event, 200);
    return { message: "File found", fileUrl: decodedUrl };
  } catch (e) {
    setResponseStatus(event, 500);
    return { message: e };
  }
});
