import {NextRequest, NextResponse} from "next/server";
import prismadb from "@/lib/prisma";


export async function GET(req:NextRequest, {params} : {params : {
    id : string
    }}) {
    const article = prismadb.article.findUnique({
        where :{
            id:params.id
        },
        include: {
                translations:true,
                tags:true,
                category:true
        }
    })
    if (article) return NextResponse.json(article)
    return NextResponse.json({error : "CATEGORY_GET not found"}, {status : 301})
}


export async function PATCH(req:NextRequest, {params} : {params : {
        id : string
    }}) {
    const body = await req.json()
    const article = prismadb.article.update({
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

    const article = prismadb.article.delete({
        where :{
            id: params.id
        }
    })

    if(article) return NextResponse.json(article)
    return NextResponse.json({error: "Article are dk"}, {status : 500})

}