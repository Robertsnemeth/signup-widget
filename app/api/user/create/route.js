import { hash } from "bcryptjs";
// We impot our prisma client
import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";


export async function POST(req) {
  console.log(req, "req")
  try {
    const { name, email, password } = (await req.json());
    console.log(name, "name", email, "email", password, "password")
    const hashPassword = await hash(password, 12);
    // create user
    const newUser = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashPassword,
      },
    });
    // await createUserHandler(req);
    return NextResponse.json({
      user: {
        name: newUser.name,
        email: newUser.email,
      },
    });  
      } catch (error) { console.log(error, "error")
      return new NextResponse(
        JSON.stringify({
          status: "error",
          message: error.message,
        }),
        { status: 500 }
        );
}}
