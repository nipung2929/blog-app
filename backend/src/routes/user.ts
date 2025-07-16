import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign } from 'hono/jwt';
import { signInSchema, userSchema } from "@nipung2929/medium";
import { Prisma } from "@prisma/client/edge"; // For handling specific DB errors
import * as bcrypt from 'bcryptjs';

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    secret: string
  }
}>();

userRouter.post('/signup', async (c) => {
  const body = await c.req.json();
  const result = userSchema.safeParse(body);

  if (!result.success) {
    return c.json({ error: "Invalid inputs" }, 400);
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const hashedPassword = await bcrypt.hash(result.data.password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        email: result.data.email,
        name: result.data.name || 'Anonymous',
        password: hashedPassword 
      }
    });

    const token = await sign({ id: user.id }, c.env.secret);

    return c.text( token );

  } catch (e) {
    
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
      return c.json({ error: "Email already exists" }, 409);
    }
    return c.json({ error: "Signup failed" }, 500);
  }
});


userRouter.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const result = signInSchema.safeParse(body);

  if (!result.success) {
    return c.json({ error: "Invalid inputs" }, 400);
  }

  const user = await prisma.user.findUnique({
    where: {
      email: body.email
      
    }
  });

  
  if (!user) {
    return c.json({ error: "Invalid credentials" }, 403);
  }

  
  const isPasswordValid = await bcrypt.compare(body.password, user.password);

  if (!isPasswordValid) {
    return c.json({ error: "Invalid credentials" }, 403);
  }

  const jwt = await sign({ id: user.id }, c.env.secret);

  return c.text( jwt );
});