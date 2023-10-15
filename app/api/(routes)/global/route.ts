import prismadb from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {

    const body  = await req.json()
    const firstGlobal = await prismadb.global.findFirst()
    
    const global = prismadb.global.update({
        where: {
            id: firstGlobal?.id
        },
        update: {
            
        },
        create: {
            translations: {
                createMany: []
            }
        }
    })
}