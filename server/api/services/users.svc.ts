import { eq } from "drizzle-orm"
import { db } from "~~/server/database/db"
import { users } from "~~/server/database/schema"

type UserDetails = {
    name: string,
    email: string,
    hashPassword: string
}

export const getUserById = async(id: number) => {
    try {
        const [fetchedUser] = await db.select().from(users).where(eq(users.id, id))
        return fetchedUser
    } catch (error) {
        console.error("Error in getUserById", error)
        return error
    }
}

export const getUserByEmail = async(email: string) => {
    try {
        const [fetchedUser] = await db.select().from(users).where(eq(users.email, email))
        return fetchedUser
    } catch (error) {
        console.error("Error in getUserByEmail", error)
        return error
    }
}

export const createUser = async(userDetails: UserDetails) => {
    try {
        const [checkUser] = await db.select().from(users).where(eq(users.email, userDetails.email))
        if (checkUser) {
            return { error: "User already exists" }
        }

        const [createdUser] = await db.insert(users).values(userDetails)
        return createdUser

    } catch (error) {
        console.error("Error in createUser", error)
        return error
    }
}

