import { UserPayload } from "~/models/payload";
import jwt from "jsonwebtoken";
import { supabase } from "~/utils/supabase";
import {config} from "dotenv";
import { db } from "~/database/db";
import { categories } from "~/database/schema";
import { eq } from "drizzle-orm";

config();

export default defineEventHandler(async (event) => {
  try {
    const token = getCookie(event, "token") as string;
    if (!token) {
      setResponseStatus(event, 401);
      return { message: "Unauthorized" };
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
    if (!verified) {
      setResponseStatus(event, 401);
      return { message: "Unauthorized" };
    }

    const body = await readMultipartFormData(event);
    console.log(body);

    const getFileData = (body as any)[0] as any;

    const fileData = getFileData.data;
    const fileName = getFileData.filename;
    const category = ((body as any)[1] as any).data.toString();

    const [checkCategory] = await db.select().from(categories).where(eq(categories.name, category))
    console.log("category check: ", checkCategory);
    if (!checkCategory) {
      setResponseStatus(event, 400);
      return { message: "Category not found!" };
    }

    const { data, error } = await supabase.storage
      .from(process.env.SUPABASE_BUCKET_NAME!)
      .upload(`${verified.id}/${category}/${fileName}`, fileData, {
        upsert: false,
        contentType: "application/pdf",
      });
    if (error) {
      setResponseStatus(event, 500);
      return { message: error.message };
    }

    setResponseStatus(event, 200);
    return { message: "File uploaded successfully." };
  } catch (e) {
    setResponseStatus(event, 500);
    return { message: e };
  }
});
