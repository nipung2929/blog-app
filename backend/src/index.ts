import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'
import { cors } from 'hono/cors'

const app = new Hono<{
  Bindings: {
    DATABASE_URL : string,
    secret : string
  },
  Variables: {
    userId: string
  }
}>()

app.use('/*', cors());

app.get('/api/v1/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())

  const blogs = await prisma.post.findMany({
    select: {
      content: true,
      title: true,
      id: true,
      author: {
        select : {
          name : true
        }
      }
    }
  });

  return c.json({
    blogs
  })
})



app.route('/api/v1/user', userRouter)
app.route('/api/v1/blog', blogRouter)

export default app
