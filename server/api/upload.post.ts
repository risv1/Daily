import { UserPayload } from "~/models/payload";
import jwt from "jsonwebtoken";
import { supabase } from "~/utils/supabase";

type Part = {
  filename: string;
  data: Buffer;
  type: string;
  name: string;
};

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
    const fileType = getFileData.type.split("/")[1];
    const category = ((body as any)[1] as any).data.toString();
    console.log("category: ", category);

    const { data, error } = await supabase.storage
      .from("docs")
      .upload(`${verified.id}/${category}/${fileName}.${fileType}`, fileData, {
        upsert: false,
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
