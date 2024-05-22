import { asc, eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { db } from "~/database/db";
import { events } from "~/database/schema";
import { EventType } from "~/models/events";
import { UserPayload } from "~/models/payload";

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
    const fetchedEvents: EventType[] = await db.select().from(events).where(eq(events.user_id, data.id))
      .orderBy(asc(events.label), asc(events.date));
      
    if(!fetchedEvents) {
      setResponseStatus(event, 404);
      return { message: "Events not found." };
    }
    if(fetchedEvents.length === 0) {
      setResponseStatus(event, 404);
      return { message: "No events listed." };
    }

    setResponseStatus(event, 200);
    return {
      message: "Events fetched successfully.",
      events: fetchedEvents,
    };

  } catch (e) {
    console.error("Error: ", e);
    setResponseStatus(event, 500);
    return { message: e };
  }
});
