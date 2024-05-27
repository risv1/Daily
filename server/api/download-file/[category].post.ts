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
    const body = await readBody(event);
    if (!category) {
      setResponseStatus(event, 400);
      return { message: "Category not found" };
    }
    if (!body) {
      setResponseStatus(event, 400);
      return { message: "Body not found" };
    }

    const { data: downloadFileBlob, error } = await supabase.storage
      .from(process.env.SUPABASE_BUCKET_NAME!)
      .download(`${data.id}/${category}/${body.fileName}`);
    if (error) {
      setResponseStatus(event, 500);
      return { message: error.message };
    }
    if (!downloadFileBlob) {
      setResponseStatus(event, 404);
      return { message: "Couldn't fetch files" };
    }

    setResponseStatus(event, 200);
    return { message: "File downloaded", file: downloadFileBlob};

  } catch (e) {
    setResponseStatus(event, 500);
    return { message: e };
  }
});
