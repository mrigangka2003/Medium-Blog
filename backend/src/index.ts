import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

//user routes
app.get('/api/v1/user/signup', (c) => {
  return c.text('Hello Hono!')
})
app.get('/api/v1/user/signin', (c) => {
  return c.text('Hello Hono!')
})
app.get('/api/v1/blog', (c) => {
  return c.text('Hello Hono!')
})


app.get('/api/v1/blog/:id', (c) => {
  const id = c.req.param('id');
  return c.json({
    blogIs:id
  })
})




export default app
