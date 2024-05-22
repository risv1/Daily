import { db } from "~/database/db";
import { events } from "~/database/schema";
import { EventType } from "~/models/events";
import { UserPayload } from "~/models/payload";
import jwt from "jsonwebtoken";
import { and, eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
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

  const id = event.context.params?.id;
  if (!id) {
    setResponseStatus(event, 400);
    return { message: "Bad Request" };
  }

  const body = await readBody(event);

  const updateEvent = await db
    .update(events)
    .set({
      title: body.title,
      description: body.description,
      date: body.date,
      label: body.label,
      updated_at:
        new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(),
    })
    .where(and(eq(events.id, id), eq(events.user_id, data.id)));

  if (!updateEvent) {
    setResponseStatus(event, 400);
    return { message: "Invalid request" };
  }

  setResponseStatus(event, 200);
  return {
    message: "Event updated",
    event: {
      title: body.title,
      description: body.description,
      date: body.date,
      label: body.label,
    },
  };
});
