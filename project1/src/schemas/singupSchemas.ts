import {z} from "zod";

export const usernameValidation = z
.string()
.min(2,"Username must be two charechter long")
.max(20,"Username must be less than 20 charechter")

export const signupSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message: 'Invalid email address'}),
    passowrd: z.string().min(6, {message: "password must be 6 charechter long"})
})