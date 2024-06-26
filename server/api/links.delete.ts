import jwt from "jsonwebtoken"
import { eq } from "drizzle-orm"
import { db } from "~/database/db"
import { links } from "~/database/schema"
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

    const deleteLink = await db.delete(links).where(eq(links.id, id))
    if(deleteLink){
        setResponseStatus(event, 200)
        return {message: "Link deleted"}
    }

    setResponseStatus(event, 400)
    return {message: "Couldn't delete link"}
})
