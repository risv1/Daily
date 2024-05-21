import { and, eq, inArray } from "drizzle-orm";
import jwt from "jsonwebtoken"
import { db } from "~/database/db";
import { events } from "~/database/schema";
import { UserPayload } from "~/models/payload"

export default defineEventHandler(async(event)=>{
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
    if(!body || !Array.isArray(body)){
        setResponseStatus(event, 400)
        return {message: "Invalid request"}
    }

    const idsToDelete = body.map(obj => obj.id);

    const deleteEvent = await db.delete(events).where(
        and(
            inArray(events.id, idsToDelete),
            eq(events.user_id, data.id)
        )
    )
    if(!deleteEvent){
        setResponseStatus(event, 400)
        return {message: "Invalid request"}
    }

    setResponseStatus(event, 200)
    return {message: "Events deleted"}

})