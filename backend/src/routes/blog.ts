import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { createBlogInput, updateBlogInput } from '@nipung2929/medium';

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    secret: string
  },
  Variables: {
    userId: string
  }
}>();

blogRouter.use('/*', async (c, next) => {
  const auth = c.req.header('Authorization') || "";
  const token = auth.split(" ")[1];
  const verifyResult = await verify(token, c.env.secret);

  if (verifyResult.id) {
    c.set("userId", verifyResult.id as string);
    await next();
  } else {
    return c.json({ message: "Not found correct authorization header" }, 400);
  }
});

blogRouter.get('/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param("id")
  const blog = await prisma.post.findFirst({
    where: {
      id: id
    }
  });

  return c.json({
    blog
  });
});

blogRouter.put('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());


  const body = await c.req.json();
  const result = updateBlogInput.safeParse(body);
  if(!result.success){
    return c.json({message : "Invalid inputs"}, 400)
  }
  const blog = await prisma.post.update({
    where: {
      id: body.id
    },
    data: {
      title: body.title,
      content: body.content,
    }
  });

  return c.json({
    id: blog.id
  });
});

blogRouter.post('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const result = createBlogInput.safeParse(body);
  if(!result.success){
    return c.json({message : "Invalid inputs"}, 400)
  }
  const authorId = c.get("userId");

  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: authorId
    }
  });

  return c.json({
    id: blog.id
  });
});
