"use server"

import { LoginSchema, RegisterSchema } from "@/lib/schemes";
import { signOut, signIn } from "./auth";
import prisma from "./db";

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
    if (!validationResult.success) {
        return {error: {message: "Wrong credentials"}}
    }
}

export async function logout() {
    await signOut();
}

export async function loginGoogle() {
 await signIn('google');
}