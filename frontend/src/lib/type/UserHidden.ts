import { z } from "zod";

export const UserInfoSchema = z.object({
    id: z.string(),
    email: z.string().trim().email(),
    displayName: z.string().trim().min(1, {message: 'Fill display name'}),
    imageURL : z.string().url(),
});

export type UserInfo = z.infer<typeof UserInfoSchema>;
