import {NextRequest, NextResponse} from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req:NextRequest, {params} : {params : {
    id : string
    }}) {
    const tag = prisma.tag.findUnique({
        where :{
            id:params.id
        }
    })
    if (tag) return NextResponse.json(tag)
    return NextResponse.json({error : "TAG_GET not found"}, {status : 301})
}


export async function PATCH(req:NextRequest, {params} : {params : {
        id : string
    }}) {
    const body = await req.json()
    const tag = prisma.tag.update({
        where : {
            id :params.id
        },
        data : {
            ...body
        }
    })

    if (tag) return NextResponse.json(tag)
    return NextResponse.json({error : "CATEGORY_PATCH error"}, {status : 500})
}

export async function DELETE(req:NextRequest,{params} : {params : {
        id : string
    }}) {

    const category = prisma.tag.delete({
        where :{
            id: params.id
        }
    })

    if(category) return NextResponse.json(category)
    return NextResponse.json({error: "AI sre s "}, {status : 500})

}