import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { db } from "~/database/db";
import { links } from "~/database/schema";
import { UserPayload } from "~/models/payload";

export default defineEventHandler(async(event) => {
    try{
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

        const getLinks = await db.select().from(links).where(eq(links.user_id, data.id))
        if(!getLinks){
            setResponseStatus(event, 500)
            return {message: "Failed to get links"}
        }

        if(getLinks.length === 0){
            setResponseStatus(event, 404)
            return {message: "No links found"}
        }

        setResponseStatus(event, 200)
        return {message: "Links fetched successfully", links: getLinks}

    } catch (e) {
        console.error("Error: ", e);
        setResponseStatus(event, 500);
        return { message: e };
    }
})