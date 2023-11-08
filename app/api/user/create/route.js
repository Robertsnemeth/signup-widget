import { SHA256 as sha256 } from "crypto-js";
// We impot our prisma client
import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";


export async function POST(req) {
  console.log(req, "req")
  try {
    const { name, email, password } = (await req.json());
    console.log(name, "name", email, "email", password, "password")
    const hashPassword = (string) => {
      return sha256(string).toString();
    };
    // create user
    const newUser = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashPassword(password),
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
// We hash the user entered password using crypto.js
// function to create user in our database
// async function createUserHandler(req, res) {
//   let errors = [];
//   console.log(req.body, "body")
//   const { name, email, password } = req.body;
//   try {
//     const newUser = await prisma.user.create({
//       data: { 
//         name,
//         email, 
//         password: hashPassword(password) },
//     });
//     console.log(newUser, "user")
//     return res.status(201).json({ newUser });
//   } catch (e) {
//     console.log(e, "error")
//     if (e instanceof Prisma.PrismaClientKnownRequestError) {
//       if (e.code === "P2002") {
//         return res.status(400).json({ message: e.message });
//       }
//       return res.status(400).json({ message: e.message });
//     }
//   }
// }