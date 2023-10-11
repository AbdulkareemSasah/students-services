import {NextRequest, NextResponse} from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req:NextRequest, {params} : {params : {
    id : string
    }}) {
    const article = prisma.categoryService.findUnique({
        where :{
            id:params.id
        },
        include: {
                translations:true,
        }
    })
    if (article) return NextResponse.json(article)
    return NextResponse.json({error : "CATEGORY_GET not found"}, {status : 301})
}


export async function PATCH(req:NextRequest, {params} : {params : {
        id : string
    }}) {
    const body = await req.json()
    const article = prisma.categoryService.update({
        where : {
            id :params.id
        },
        data : {
            ...body
        }
    })

    if (article) return NextResponse.json(article)
    return NextResponse.json({error : "Article_PATCH error"}, {status : 500})
}

export async function DELETE(req:NextRequest,{params} : {params : {
        id : string
    }}) {

    const article = prisma.categoryService.delete({
        where :{
            id: params.id
        }
    })

    if(article) return NextResponse.json(article)
    return NextResponse.json({error: "Article are dk"}, {status : 500})

}