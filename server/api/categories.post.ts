import jwt from "jsonwebtoken";
import { db } from "~/database/db";
import { categories } from "~/database/schema";
import { Category } from "~/models/category";
import { UserPayload } from "~/models/payload";
import { v4 as uuidv4 } from "uuid";

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

        const body = await readBody(event);
        if(!body.category){
            setResponseStatus(event, 400);
            return { message: "Bad Request" };
        }

        const categoryData: Category = {
            id: uuidv4(),
            user_id: data.id,
            name: body.category,
            created_at: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(),
            updated_at: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
        }

        const insertCategory = await db.insert(categories).values(categoryData)
        if(!insertCategory){
            setResponseStatus(event, 400);
            return { message: "Invalid request" };
        }

        setResponseStatus(event, 201);
        return { message: "Category created", category: categoryData};

    } catch(e){
        setResponseStatus(event, 401);
        return { message: "Unauthorized" };
    }
})