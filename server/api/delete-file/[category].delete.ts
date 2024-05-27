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

    const verified = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
    if (!verified) {
      setResponseStatus(event, 401);
      return { message: "Unauthorized" };
    }

    const body = await readBody(event);
    if (!body) {
      setResponseStatus(event, 400);
      return { message: "Bad Request" };
    }

    const category = event.context.params?.category;
    const file = body.fileName;

    const { data: deletedFile, error } = await supabase.storage.
    from(process.env.SUPABASE_BUCKET_NAME!).
    remove([`${verified.id}/${category}/${file}`]);
    if(error) {
      setResponseStatus(event, 500);
      return { message: error.message };
    }
    if(!deletedFile) {
      setResponseStatus(event, 404);
      return { message: "File not found" };
    }

    setResponseStatus(event, 200);
    return { message: "File deleted successfully." };

  } catch (e) {
    setResponseStatus(event, 500);
    return { message: e };
  }
});
