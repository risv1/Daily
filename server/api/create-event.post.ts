import jwt from "jsonwebtoken"
import { db } from "~/database/db"
import { events } from "~/database/schema"
import { EventType } from "~/models/events"
import { v4 as uuidv4 } from "uuid"
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
    if(!body){
        setResponseStatus(event, 400)
        return {message: "Invalid request"}
    }

    const newEvent: EventType = {
        id: uuidv4(),
        user_id: data.id,
        title: body.title,
        description: body.description,
        date: body.date,
        label: body.label,
        created_at: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(),
        updated_at: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
    } 

    const createEvent = await db.insert(events).values(newEvent)
    if(!createEvent){
        setResponseStatus(event, 500)
        return {message: "Failed to create event"}
    }

    setResponseStatus(event, 201)
    return {message: "Event created successfully", event: newEvent}
})  