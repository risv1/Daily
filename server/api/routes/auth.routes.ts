import { createRouter, setResponseStatus, defineEventHandler } from "h3"
import { login, logout, session, signUp } from "../handlers/auth.handlers"

const authRouter = createRouter()

authRouter.post("/signup", defineEventHandler(async(event)=>{
    return signUp(event)
}))

authRouter.post("/login", defineEventHandler(async(event)=>{
    return login(event)
}))

authRouter.post("/logout", defineEventHandler(async(event)=>{
    return logout(event)
}))

authRouter.get("/session", defineEventHandler(async(event)=>{
    return session(event)
}))

authRouter.use("/**", defineEventHandler((event) => {
    setResponseStatus(event, 404)
    return { error: "Endpoint not found" }
}))


export default authRouter.handler