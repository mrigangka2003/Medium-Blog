import z from "zod";

//User zod Schemas

export const signupInput = z.object({
  username: z.string().trim(),
  password: z.string().min(6),
  name: z.string().optional(),
});
export const signinInput = z.object({
  username: z.string().trim(),
  password: z.string().min(6),
});


//user zod types
export type SignupInput = z.infer<typeof signupInput>;

export type SigninInput = z.infer<typeof signinInput>;

//Blog zod Schema
export const createBlogInput = z.object({
  title: z.string(),
  content: z.string(),
});

export const updateBlogInput = z.object({
    title: z.string(),
    content: z.string(),
    id: z.string(),
});

//blog zod types

export type CreateBlogInput = z.infer<typeof createBlogInput>;
export type UpdateBlogInput = z.infer<typeof updateBlogInput>;
