import { eq } from "drizzle-orm"
import { db } from "~/database/db"
import { links } from "~/database/schema"

export default defineEventHandler(async(event)=>{
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
