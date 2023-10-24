import prismadb from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req:NextRequest, {params}: {params: {id:string}}) {
    const socialLink = await prismadb.socialLink.delete({
        where:{
            id: params.id
        }
    })

    return NextResponse.json(socialLink)
}

export async function PATCH(req:NextRequest, {params}: {params: {id:string}}) {
    try {
        const body = await req.json()
        const socialLink = await prismadb.socialLink.update({
            where:{
                id:params.id
            },
            data: {
                ...body
            }
        })
        
        return NextResponse.json(socialLink)
    }

    catch (err) {
        console.log(err)
        return NextResponse.json({error : "Server Error"}, {status: 501})
    } 
}