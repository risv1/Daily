import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { db } from "~/database/db";
import { categories } from "~/database/schema";
import { UserPayload } from "~/models/payload";

export default defineEventHandler(async(event)=>{
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

        const getCategories = await db.select().from(categories).where(eq(categories.user_id, data.id))
        if(!getCategories){
            setResponseStatus(event, 404);
            return {message: "Couldn't fetch categories"}
        }

        if(getCategories.length === 0){
            setResponseStatus(event, 404);
            return {message: "No categories found"}
        }

        setResponseStatus(event, 200);
        return {message: "Categories found", categories: getCategories}

    } catch(e){
        setResponseStatus(event, 500);
        return {message: e};
    }
})