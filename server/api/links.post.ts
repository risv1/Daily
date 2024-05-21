import jwt from "jsonwebtoken";
import { db } from "~/database/db";
import { links } from "~/database/schema";
import { UserPayload } from "~/models/payload";
import { v4 as uuid } from "uuid";
import { Link } from "~/models/link";

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

    const body = await readBody(event)

    const toInsertLink: Link = {
        id: uuid(),
        user_id: data.id,
        title: body.title,
        url: body.url,
        created_at: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(),
        updated_at: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(),
    }

    const insertLink = await db.insert(links).values(toInsertLink)
    if(!insertLink){
        setResponseStatus(event, 500)
        return {message: "Failed to create link"}
    }

    setResponseStatus(event, 201)
    return {message: "Link created successfully", link: toInsertLink}

  } catch (e) {
    console.error("Error: ", e);
    setResponseStatus(event, 500);
    return { message: e };
  }
});
