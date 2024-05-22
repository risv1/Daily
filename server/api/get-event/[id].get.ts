import { and, eq } from 'drizzle-orm'
import jwt from 'jsonwebtoken'
import { db } from '~/database/db'
import { events } from '~/database/schema'
import { EventType } from '~/models/events'
import { UserPayload } from '~/models/payload'

export default defineEventHandler(async(event)=>{
    const token = getCookie(event, 'token')
    if(!token){
        setResponseStatus(event, 401)
        return {message: 'Unauthorized'}
    } 

    const data = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload
    if(!data){
        setResponseStatus(event, 401)
        return {message: 'Unauthorized'}
    }

    const id = event.context.params?.id
    if(!id){
        setResponseStatus(event, 400)
        return {message: 'Bad Request'}
    }

    const [getEvent]: EventType[] = await db.select().from(events).where(and(eq(events.id, id), eq(events.user_id, data.id)))
    if(!getEvent){
        setResponseStatus(event, 400)
        return {message: 'Invalid request'}
    }

    setResponseStatus(event, 200)
    return {message: "Event fetched", event: {
        id: getEvent.id,
        user_id: getEvent.user_id,
        title: getEvent.title,
        description: getEvent.description,
        date: getEvent.date,
        label: getEvent.label,
        created_at: getEvent.created_at,
        updated_at: getEvent.updated_at
    }}

})