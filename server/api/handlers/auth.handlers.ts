import type { H3Event } from "h3";
import type { User } from "~~/server/database/schema";
import type { JwtPayload } from "jsonwebtoken";
import { createUser, getUserByEmail, getUserById } from "../services/users.svc";
import { cacheService } from "../services/cache.svc";
import { comparePassword, hashPassword } from "../utils/hash";
import { signJwt, verifyJwt } from "../utils/jwt";

export const signUp = async (event: H3Event) => {
  const body = await readBody(event);
  if (!body.name || !body.email || !body.password) {
    setResponseStatus(event, 400);
    return { error: "Missing fields" };
  }

  const hashedPassword = await hashPassword(body.password);

  const userDetails = {
    name: body.name,
    email: body.email,
    hashPassword: hashedPassword,
  };

  try {
    await createUser(userDetails);
    setResponseStatus(event, 201);
    return { messsage: "User created successfully" };
  } catch (error) {
    setResponseStatus(event, 500);
    return { error: error };
  }
};

export const login = async (event: H3Event) => {
  const body = await readBody(event);
  if (!body.email || !body.password) {
    setResponseStatus(event, 400);
    return { error: "Missing fields" };
  }

  const user = (await getUserByEmail(body.email)) as User;
  if (!user) {
    setResponseStatus(event, 404);
    return { error: "User not found" };
  }

  const isPasswordCorrect = await comparePassword(
    body.password,
    user.hashPassword,
  );
  if (!isPasswordCorrect) {
    setResponseStatus(event, 401);
    return { error: "Incorrect password" };
  }

  const token = signJwt(user.id);

  setCookie(event, "token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  setResponseStatus(event, 200);
  return { message: "Login successful" };
};

export const logout = async (event: H3Event) => {
  const cookie = getCookie(event, "token");
  if (!cookie) {
    setResponseStatus(event, 401);
    return { error: "Not logged in" };
  }

  setCookie(event, "token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 0,
  });

  setResponseStatus(event, 200);
  return { message: "Logout successful" };
};

export const session = async (event: H3Event) => {
  const token = getCookie(event, "token");
  if (!token) {
    setResponseStatus(event, 401);
    return { error: "Not logged in" };
  }

  const decoded = verifyJwt(token) as JwtPayload;
  if (!decoded) {
    setResponseStatus(event, 401);
    return { error: "Invalid token" };
  }

  let user = cacheService.get(decoded.userId);
  if (!user) {
    console.log("I hit the database");
    user = (await getUserById(decoded.userId)) as User;
    if (!user) {
      setResponseStatus(event, 404);
      return { error: "User not found" };
    }

    cacheService.set(decoded.userId, user);
  }

  setResponseStatus(event, 200);
  return { message: "Session active" };
};
