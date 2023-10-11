import prisma from "@/lib/prisma";

import { NextRequest, NextResponse } from "next/server";
const bcrypt = require("bcrypt")



// POST /api/user
export async function POST(req:NextRequest) {

  const body = await req.json()
  
  const { email, password } = body;

  
  const hash = await bcrypt.hashSync(password, 10)
  const user = await prisma.user.create({
      data: { 
        email:email,
        password: hash 
      },
      select:{
          role:true,
          email:true,
          name:true,
          image:true
      }
    });

  return NextResponse.json(user)

  
}