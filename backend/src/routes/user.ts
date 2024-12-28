import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign, verify } from "hono/jwt";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  try {
    const user = await prisma.user.create({
      data: {
        username: body.username,
        password: body.password,
        name: body.name || "",
      },
    });

    if (!user) {
      c.status(403);
      return c.json({
        message: "Something went wrong",
      });
    }

    const token = await sign(
      {
        id: user.id,
      },
      c.env.JWT_SECRET
    );

    return c.json({
      token:token
    })
  } catch (error) {
    c.status(403);
    return c.json({
      message: "Something went wrong",
    });
  }
});

userRouter.post("/signin", async(c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json() ;
  try {
    const user = await prisma.user.findUnique({
      where:{
        username : body.email,
        password : body.password 
      }
    })

    if(!user){
      c.status(401) ;
      return c.json({
        message :"The account doesn't exists"
      })
    }

    const token = await sign({id: user.id} , c.env.JWT_SECRET);

    return c.json({
      token : token
    })
  } catch (error) {
    c.status(401);
      return c.json({
        message:"Something went wrong"
      })
  }
});
