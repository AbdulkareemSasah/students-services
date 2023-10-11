import prismadb from "@/lib/prisma";
import {NextRequest, NextResponse} from "next/server";

// GET /api/user/:id
export async function GET(req:NextRequest, {params} : {params : {id:string}}) {
  const user = await prismadb.user.findUnique({
    where: { id: params.id },
    // include: { id: true, name: true, email: true, image: true },
  });
  return NextResponse.json(user);
}

// PATCH /api/user/:id
export async function PATCH(req:NextRequest, {params} : {params : {id:string}}) {

  const user = await prismadb.user.update({
    where: { id: params.id },
    data: { ...req.body },
  });
  return NextResponse.json(user);
}

// DELETE /api/user/:id
export async function DELETE(req:NextRequest, {params} : {params : {id:string}}) {
  const user = await prismadb.user.delete({
    where: { id: params.id },
  });
  return NextResponse.json(user);
}