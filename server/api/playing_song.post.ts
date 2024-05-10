export default defineEventHandler(async(event)=>{
    const body = await readBody(event)
    
    if(!body) {
        setResponseStatus(event, 400)
        return {
            message: "No body provided"
        }
    }

    const data = {
        song: body.song,
        artist: body.artist,
        album: body.albumName,
        duration: body.duration
    }

    setResponseStatus(event, 200)
    setResponseHeaders(event, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    })
    console.log("Playing song", data)
    return {
        message: "Playing song",
        song: body
    }
})