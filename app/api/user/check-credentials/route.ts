import prismadb from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import {omit} from "next/dist/shared/lib/router/utils/omit";
const bcrypt = require('bcrypt')


// POST /api/user/create
export async function POST(req:NextRequest) {
  const body = await req.json()
  const user = await prismadb.user.findUnique({
    where: { email: body.email },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
        role:true,
      password: true,
    },
  });
  if (user){
      const result = await bcrypt.compareSync(body.password, user.password)
      if (result) {
        console.log("ok")
        return NextResponse.json(omit(user, ["password"]), { status: 200 });
      } else {
        console.log("not ok 1")
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 })
      }
  }
   else {
    console.log("not ok 2")
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 })
  }
      
  
}