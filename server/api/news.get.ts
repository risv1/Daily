import jwt from "jsonwebtoken";
import { UserPayload } from "~/models/payload";

export default defineEventHandler(async(event)=>{
    try{
        const token = getCookie(event, "token") as string;
        if (!token) {
          setResponseStatus(event, 401);
          return { message: "Unauthorized" };
        }
    
        const tokenData = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
        if (!tokenData) {
          setResponseStatus(event, 401);
          return { message: "Unauthorized" };
        }
        
        const res = await fetch(`https://newsapi.org/v2/top-headlines/?category=technology&language=en&pageSize=10&apiKey=${process.env.NEWS_API_KEY}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        if(!res.ok){
            console.log(res.status)
            setResponseStatus(event, res.status)
            return {message: 'Failed to fetch news'}
        }
        const data = await res.json()
        setResponseStatus(event, 200)
        return {message: "Fetch news successfully", news: data.articles}
    } catch(e) {
        console.error(e)
        setResponseStatus(event, 500)
        return {message: 'Error: ' + e}
    }
})