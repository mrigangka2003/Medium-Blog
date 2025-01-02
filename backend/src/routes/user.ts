import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { signinInput, signupInput } from "mrigangka-medium-common";

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
  const {success} = signupInput.safeParse(body) ;
  if(!success){
    c.status(411);
    return c.json({
      message:"Inputs are not correct"
    })
  }
  try {

    const existingUser = await prisma.user.findUnique({
      where:{
        username : body.username
      }
    })

    if(existingUser){
      c.status(409);
      return c.json({message :"username already exists"})
    }
    const user = await prisma.user.create({
      data: {
        username: body.username,
        password: body.password,
        name: body.name || "",
      },
    });

    if (!user) {
      c.status(403);
      console.error() ;
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

  const { success } = signinInput.safeParse(body);
	if(!success){
		c.status(411);
		return c.json({
			msg: "Inputs are incorrect"
		})
	}

  try {
    const user = await prisma.user.findUnique({
      where:{
        username : body.username,
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
