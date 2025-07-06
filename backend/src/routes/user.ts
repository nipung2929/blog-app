import { Hono } from "hono"
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signInSchema, userSchema } from "@nipung2929/medium";



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
    return c.json({ error: "wrong inputs" }, 400);
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const user = await prisma.user.create({
    data: {
      email: body.email,
      name: body.name,
      password: body.password
    }
  });

  if (!user) {
    return c.json({ error: "something went wrong" }, 400);
  }

  const token = await sign({ id: user.id }, c.env.secret);

  return c.text(token);
});

userRouter.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const result = await signInSchema.safeParse(body);

  if (!result.success) {
    return c.json({ error: "wrong inputs" }, 400);
  }

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password
    }
  });

  if (!user) {
    return c.json({ error: "user not found" }, 400);
  }

  const jwt = await sign({ id: user.id }, c.env.secret);

  return c.text(jwt);
});