import { eq } from "drizzle-orm"
import jwt from "jsonwebtoken"
import { db } from "~/database/db"
import { events } from "~/database/schema"
import { UserPayload } from "~/models/payload"

export default defineEventHandler(async(event)=>{
    const token = getCookie(event, "token") as string
    if(!token){
        setResponseStatus(event, 401)
        return {message: "Unauthorized"}
    }

    const data = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload
    if(!data){
        setResponseStatus(event, 401)
        return {message: "Unauthorized"}
    }

    const {id} = await readBody(event)
    if(!id){
        setResponseStatus(event, 400)
        return {message: "Couldn't parse request"}
    }

    const deleteEvent = await db.delete(events).where(eq(events.id, id))
    if(deleteEvent){
        setResponseStatus(event, 200)
        return {message: "Event deleted"}
    }

    setResponseStatus(event, 400)
    return {message: "Couldn't delete event"}
})