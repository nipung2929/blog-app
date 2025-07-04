
import { z } from 'zod'

export const userSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  password: z.string()
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

export const createBlogInput = z.object({
    title: z.string(),
    content: z.string()

})

export const updateBlogInput = z.object({
    title: z.string(),
    content: z.string(),
    id: z.string()

})

export type UpdateBlogInput = z.infer<typeof updateBlogInput>;
export type UserSchema = z.infer<typeof userSchema>;
export type SigninSchema = z.infer<typeof signInSchema>;
export type CreateBlogInput = z.infer<typeof createBlogInput>;
