"use server"

import { LoginSchema, RegisterSchema } from "@/lib/schemes";

export async function register(_: any, rawData: FormData) {
    const data = Object.fromEntries(rawData) as unknown as typeof RegisterSchema._type;
    const validationResult = await RegisterSchema.safeParseAsync(data);
    if (!validationResult.success) {
        return validationResult.error?.flatten().fieldErrors;
    }

    console.log("Successfully signed up");
}

export async function login(_ :any, rawData: FormData) {
    const data = Object.fromEntries(rawData) as unknown as typeof LoginSchema._type;
    const validationResult = await LoginSchema.safeParseAsync(data);
    if (!validationResult.success || data.email.length < 5 || data.password.length < 8) {
        return {message: "Wrong credentials"}
    }

    console.log("Successfully signed in")
}