"use server"
import { users } from "../appwrite.config"
import { ID } from "node-appwrite";

export const createUser = async ({name,email,phone}: CreateUserParams) => {
    // return JSON.stringify(props)
    try {
        const newUser = await users.create(
            ID.unique(),
            email,
            phone,
            undefined,
            name,
    )
        return JSON.parse(JSON.stringify(newUser))
    } catch (error: any) {
        console.log('Error')
    }
}