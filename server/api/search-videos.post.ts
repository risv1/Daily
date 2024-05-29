import jwt from "jsonwebtoken";
import { UserPayload } from "~/models/payload";

export default defineEventHandler(async (event) => {
  try {
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

    const body = await readBody(event);
    if (!body) {
      setResponseStatus(event, 400);
      return { message: "Please provide a search query." };
    }

    const getVideos = async (query: string) => {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${query}&key=${process.env.YOUTUBE_API_KEY}`);
        const data = await response.json();
        return data.items;
      }

    const videos = await getVideos(body.query);
    if(!videos) {
      setResponseStatus(event, 404);
      return { message: "No videos found." };
    }

    setResponseStatus(event, 200);
    return { message: "Videos found.", videos: videos };

  } catch (e) {
    setResponseStatus(event, 500);
    return { message: "Error: " + e };
  }
});
