import jwt from "jsonwebtoken";
import { UserPayload } from "~/models/payload";
import { supabase } from "~/utils/supabase";
import { config } from "dotenv";

config();

export default defineEventHandler(async (event) => {
  try {
    const token = getCookie(event, "token") as string;
    if (!token) {
      setResponseStatus(event, 401);
      return { message: "Unauthorized" };
    }

    const data = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
    if (!data) {
      setResponseStatus(event, 401);
      return { message: "Unauthorized" };
    }

    const category = event.context.params?.category;
    if (!category) {
      setResponseStatus(event, 400);
      return { message: "Category not found" };
    }

    const { data: getFiles, error } = await supabase.storage
      .from(process.env.SUPABASE_BUCKET_NAME!)
      .list(`${data.id}/${category}`);
    if (error) {
      setResponseStatus(event, 500);
      return { message: error.message };
    }
    if (!getFiles) {
      setResponseStatus(event, 404);
      return { message: "Couldn't fetch files" };
    }

    if (getFiles.length === 0) {
      setResponseStatus(event, 404);
      return { message: "No files found" };
    }

    setResponseStatus(event, 200);
    return { message: "Files found", files: getFiles };
  } catch (e) {
    setResponseStatus(event, 500);
    return { message: e };
  }
});
